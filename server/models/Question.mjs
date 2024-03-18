import mongoose from "mongoose";

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
    scope: String,
    level: Number,
    process: String,
    lastTimeAudit: Date,
  },
  {
    statics: {
      generateQuestions({ dep, process, level }) {
        const questions = this.aggregate([
          {
            $match: {
              dep: dep,
              process: process,
              level: level,
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
            $unwind: {
              path: "$question",
            },
          },
          {
            $sort: {
              "question.lastTimeAudit": 1,
            },
          },
          {
            $group: {
              _id: "$_id",
              question: {
                $push: "$question",
              },
            },
          },
          {
            $project: {
              question: {
                $slice: ["$question", 1],
              },
            },
          },
        ]);

        return questions;
      },
    },
  }
);

const Question = new mongoose.model("Question", questionSchema);
export default Question;
