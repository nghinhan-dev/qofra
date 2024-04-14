import mongoose from "mongoose";

const { Schema } = mongoose;

const findingSchema = new Schema(
  {
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
    foundDate: Date,
    dueDate: Date,
    completionDate: Date,
    action: String,
    detector: String,
    personInCharge: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    desc: String,
    images: [String],
    status: {
      type: String,
      enum: {
        values: ["Ongoing", "Orverdue", "Done"],
        message: "{VALUE} is not supported",
      },
    },
  },
  {
    statics: {
      async drawChart() {
        const overallChart = await this.aggregate([
          {
            $match: {
              foundDate: {
                $gte: new Date("Sun, 01 Jan 2023 00:00:00 GMT"),
                $lt: new Date("Mon, 01 Jan 2024 00:00:00 GMT"),
              },
            },
          },
          {
            $lookup: {
              from: "questions",
              let: {
                qID: "$question",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: [
                        {
                          $toString: "$_id",
                        },
                        "$$qID",
                      ],
                    },
                  },
                },
                {
                  $project: {
                    process: 1,
                    _id: 0,
                  },
                },
              ],
              as: "question",
            },
          },
          {
            $unwind: {
              path: "$question",
            },
          },
          {
            $group: {
              _id: {
                month: {
                  $month: "$foundDate",
                },
                status: "$status",
              },
              extruder: {
                $sum: {
                  $cond: {
                    if: {
                      $eq: ["$question.process", "Extruder"],
                    },
                    then: 1,
                    else: 0,
                  },
                },
              },
              crushing: {
                $sum: {
                  $cond: {
                    if: {
                      $eq: ["$question.process", "Crushing"],
                    },
                    then: 1,
                    else: 0,
                  },
                },
              },
              mixing: {
                $sum: {
                  $cond: {
                    if: {
                      $eq: ["$question.process", "Mixing"],
                    },
                    then: 1,
                    else: 0,
                  },
                },
              },
              moldSetter: {
                $sum: {
                  $cond: {
                    if: {
                      $eq: ["$question.process", "Mold Setter"],
                    },
                    then: 1,
                    else: 0,
                  },
                },
              },
            },
          },
          {
            $group: {
              _id: "$_id.month",
              stats: {
                $push: "$$ROOT",
              },
            },
          },
          {
            $project: {
              stats: {
                _id: {
                  month: 0,
                },
              },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ]);

        const doughnutChart = await this.aggregate(
          [
            {
              $match: {
                foundDate: {
                  $gte: new Date("2023-01-01"),
                  $lt: new Date("2024-01-01"),
                },
              },
            },
            {
              $lookup: {
                from: "questions",
                let: { qID: "$question" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: [{ $toString: "$_id" }, "$$qID"],
                      },
                    },
                  },
                  { $project: { scope: 1, _id: 0 } },
                ],
                as: "question",
              },
            },
            {
              $group: {
                _id: "$question.scope",
                count: { $count: {} },
              },
            },
            { $sort: { _id: 1 } },
          ],
          { maxTimeMS: 60000, allowDiskUse: true }
        );

        return { overallChart, doughnutChart };
      },
    },
  }
);

const Finding = new mongoose.model("Finding", findingSchema);

export default Finding;
