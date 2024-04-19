import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    inCharge: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    content: String,
    dep: String,
    scope: {
      type: String,
      enum: {
        values: ["Safety", "Man", "Machine", "Method/ Measure", "Material"],
        message: "{VALUE} is not supported",
      },
    },
    level: {
      type: Number,
      enum: {
        values: [1, 2, 3],
        message: "{VALUE} is not supported",
      },
    },
    process: String,
    lastTimeAudit: {
      type: Date,
      default: Date.now(),
    },
    hasIssue: {
      type: Boolean,
      default: false,
    },
  },
  {
    statics: {
      generateQuestions({ dep, process, level, hasIssue = false }) {
        const questions = this.aggregate([
          {
            $match: {
              dep: dep,
              process: process,
              level: level,
              hasIssue: hasIssue,
            },
          },
          {
            $sort: {
              lastTimeAudit: -1,
            },
          },
          {
            $group: {
              _id: "$scope",
              question: {
                $push: "$$ROOT",
              },
            },
          },
          {
            $project: {
              question:
                level * 1 === 3
                  ? 1
                  : {
                      $slice: ["$question", 1 * level],
                    },
            },
          },
          {
            $unwind: {
              path: "$question",
            },
          },
          {
            $lookup: {
              from: "users",
              let: {
                inChargeIds: "$question.inCharge",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: [
                        {
                          $toString: "$_id",
                        },
                        "$$inChargeIds",
                      ],
                    },
                  },
                },
              ],
              as: "question.inCharge",
            },
          },
          {
            $project: {
              question: {
                _id: 1,
                scope: 1,
                inCharge: {
                  _id: 1,
                  fullName: 1,
                },
                content: 1,
                process: 1,
                dep: 1,
                level: 1,
                lastTimeAudit: 1,
                hasIssue: 1,
              },
            },
          },
        ]);

        return questions;
      },
      async skipQuestion({ _id, scope, dep, process, level }) {
        const questions = await this.aggregate([
          {
            $match: {
              _id: {
                $ne: new ObjectId(_id),
              },
              scope: scope,
              process: process,
              dep: dep,
              level: level,
            },
          },
          {
            $sort: {
              lastTimeAudit: -1,
              hasIssue: 1,
            },
          },
          {
            $lookup: {
              from: "users",
              let: {
                inChargeIds: "$inCharge",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: [
                        {
                          $toString: "$_id",
                        },
                        "$$inChargeIds",
                      ],
                    },
                  },
                },
              ],
              as: "inCharge",
            },
          },
          {
            $project: {
              _id: 1,
              scope: 1,
              inCharge: {
                _id: 1,
                fullName: 1,
              },
              content: 1,
              process: 1,
              dep: 1,
              level: 1,
              lastTimeAudit: 1,
              hasIssue: 1,
            },
          },
        ]);

        return questions[0];
      },
      async passed(_id) {
        const question = await this.findByIdAndUpdate(
          _id,
          {
            lastTimeAudit: Date.now(),
            hasIssue: false,
          },
          {
            new: true,
          }
        );

        return question;
      },
    },
  }
);

const Question = new mongoose.model("Question", questionSchema);
export default Question;
