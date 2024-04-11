import Question from "../models/Question.mjs";
import Audit from "../models/Audit.mjs";
import { createError } from "../utils/createError.mjs";

export async function generateQuestions(req, res, next) {
  try {
    const nestedQuestions = await Question.generateQuestions(req.body);

    if (nestedQuestions.length === 0)
      throw createError(400, "Cannot find questions meet the require");

    const questions = nestedQuestions.map((obj) => obj.question);
    await Audit.create({ process: req.body.process });

    res.status(200).send(questions);
  } catch (error) {
    next(error);
  }
}

export async function skipQuestion(req, res, next) {
  try {
    const newQuestion = await Question.skipQuestion(req.body);

    res.status(200).send({ newQuestion });
  } catch (error) {
    next(error);
  }
}

export async function passedQuestion(req, res, next) {
  try {
    await Question.passed(req.params.questionID);

    res.status(200).send({ message: "Updated" });
  } catch (error) {
    next(error);
  }
}

export async function paginate(req, res, next) {
  try {
    let questions;

    if (Object.keys(req.query).length !== 0) {
      const aggregateObj = Object.fromEntries(
        Object.entries(req.query).map(([key, value]) =>
          Array.isArray(value) ? [key, { $in: value }] : [key, value]
        )
      );

      questions = await Question.aggregate([
        {
          $match: aggregateObj,
        },
      ]);
    } else {
      questions = await Question.find({}).limit(20);
    }

    res.status(200).send({
      length: questions.length,
      result: questions,
    });
  } catch (error) {
    next(error);
  }
}
