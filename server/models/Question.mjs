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
    scope: String,
    level: Number,
    process: String,
    lastTimeAudit: Date,
    hasIssue: Boolean,
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
              "question.lastTimeAudit": -1,
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
      skipQuestion({ _id, scope, dep, process, level }) {
        const questions = this.aggregate([
          {
            $match: {
              _id: {
                $ne: ObjectId(_id),
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
