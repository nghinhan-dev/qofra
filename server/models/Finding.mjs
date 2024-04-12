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
      drawChart() {
        const chartData = this.aggregate([
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
                { $project: { process: 1, _id: 0 } },
              ],
              as: "question",
            },
          },
          { $unwind: { path: "$question" } },
          {
            $group: {
              _id: {
                month: { $month: "$foundDate" },
                process: "$question.process",
              },
              done: {
                $sum: {
                  $cond: {
                    if: { $eq: ["$status", "Done"] },
                    then: 1,
                    else: 0,
                  },
                },
              },
              overdue: {
                $sum: {
                  $cond: {
                    if: { $eq: ["$status", "Overdue"] },
                    then: 1,
                    else: 0,
                  },
                },
              },
              onGoing: {
                $sum: {
                  $cond: {
                    if: { $eq: ["$status", "Ongoing"] },
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
              findings: { $push: "$$ROOT" },
            },
          },
          {
            $addFields: {
              findings: {
                $map: {
                  input: "$findings",
                  in: {
                    $mergeObjects: [
                      { process: "$$this._id.process" },
                      "$$this",
                    ],
                  },
                },
              },
            },
          },
          {
            $project: {
              _id: 1,
              findings: {
                $map: {
                  input: "$findings",
                  in: {
                    process: "$$this.process",
                    done: "$$this.done",
                    overdue: "$$this.overdue",
                    onGoing: "$$this.onGoing",
                  },
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

        return chartData;
      },
    },
  }
);

const Finding = new mongoose.model("Finding", findingSchema);

export default Finding;
