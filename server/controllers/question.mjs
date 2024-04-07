import Question from "../models/Question.mjs";
import { createError } from "../utils/createError.mjs";

export async function generateQuestions(req, res, next) {
  try {
    const nestedQuestions = await Question.generateQuestions(req.body);

    if (nestedQuestions.length === 0)
      throw createError(400, "Cannot find questions meet the require");

    const questions = nestedQuestions.map((obj) => obj.question);

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
    const page = req.query.page;
    const questions = await Question.paginate(page);

    res.status(200).send({
      length: questions.length,
      result: questions,
    });
  } catch (error) {
    next(error);
  }
}
