[
    {
        $sort: {"_id": -1}
    },
    {
        $limit: 1
    },
    {
      $project: {
          _id: 0,
          Epoch: "$_id"
      }
    }
]
