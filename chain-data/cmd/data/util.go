package main

import (
	"time"

	logging "github.com/ipfs/go-log/v2"
)

const (
	mainnetBeginTime = "2020-08-25T06:00:00+08:00" // 高度0时的时间
)

var (
	log   = logging.Logger("data")
	fxlog = &fxLogger{
		ZapEventLogger: log,
	}
	Loc, _      = time.LoadLocation("Asia/Shanghai")
	baseTime, _ = time.Parse(time.RFC3339, mainnetBeginTime)
)

type fxLogger struct {
	*logging.ZapEventLogger
}

// Printf impls fx.Printer.Printf
func (l *fxLogger) Printf(msg string, args ...interface{}) {
	l.ZapEventLogger.Debugf(msg, args...)
}

func CalcTimeByEpoch(height uint64) time.Time {
	return time.Unix(baseTime.Unix()+int64(height)*30, 0).In(Loc)
}
