package main

import (
	"bytes"
	"go/format"
	"io"
	"os"
	"path/filepath"
	"strings"
	"text/template"
)

// go run gen/gen.go
func main() {
	// read all js
	nameInfos := make([]*GenNameInfo, 0)
	err := filepath.Walk("./", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if !info.IsDir() && strings.HasSuffix(info.Name(), ".js") {
			camelName := ConvertToCamelCase(strings.TrimSuffix(filepath.Base(path), filepath.Ext(path)))
			upperCamelName := ConvertToUpperCamelCase(strings.TrimSuffix(filepath.Base(path), filepath.Ext(path)))
			nameInfos = append(nameInfos, &GenNameInfo{FileName: filepath.Base(path), CamelName: camelName, UpperCamelName: upperCamelName})
		}

		return nil
	})

	if err != nil {
		panic(err)
	}

	// gen aggregators.go
	buf := new(bytes.Buffer)
	if err := genHeader(buf); err != nil {
		panic(err)
	}

	for _, nameInfo := range nameInfos {
		if err := genEmbed(nameInfo, buf); err != nil {
			panic(err)
		}
	}

	for _, nameInfo := range nameInfos {
		if err := genExpose(nameInfo, buf); err != nil {
			panic(err)
		}
	}

	data, err := format.Source(buf.Bytes())
	if err != nil {
		panic(err)
	}

	fi, err := os.Create("./pool-monitor/aggregators.go")
	if err != nil {
		panic(err)
	}

	_, err = fi.Write(data)
	if err != nil {
		_ = fi.Close()
		panic(err)
	}

	_ = fi.Close()
}

type GenNameInfo struct {
	FileName       string
	CamelName      string
	UpperCamelName string
}

func genHeader(w io.Writer) error {
	err := doTemplate(w, nil, `package pool_monitor

import (
	_ "embed"
)
`)
	if err != nil {
		return err
	}

	return nil
}

func genEmbed(gni *GenNameInfo, w io.Writer) error {
	err := doTemplate(w, gni, `//go:embed {{ .FileName}}
var {{ .CamelName}}Aggregator []byte
`)
	if err != nil {
		return err
	}

	return nil
}

func genExpose(gni *GenNameInfo, w io.Writer) error {
	err := doTemplate(w, gni, `func Get{{ .UpperCamelName}}Aggregator() []byte {
	return {{ .CamelName}}Aggregator
}
`)
	if err != nil {
		return err
	}

	return nil
}

func doTemplate(w io.Writer, info interface{}, templ string) error {
	t := template.Must(template.New("").Parse(templ))

	return t.Execute(w, info)
}

// ConvertToCamelCase convert underscore to camel
func ConvertToCamelCase(underscore string) string {
	words := strings.Split(underscore, "_")
	for i := 0; i < len(words); i++ {
		if i == 0 {
			words[i] = strings.ToLower(words[i])
		} else {
			words[i] = strings.Title(words[i])
		}
	}
	return strings.Join(words, "")
}

func ConvertToUpperCamelCase(underscore string) string {
	words := strings.Split(underscore, "_")
	for i := 0; i < len(words); i++ {
		words[i] = strings.Title(words[i])
	}
	return strings.Join(words, "")
}
