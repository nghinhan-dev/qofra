import Question from "../models/Question.mjs";

export async function generateQuestions(req, res, next) {
  try {
    const questions = await Question.generateQuestions(req.body);

    res.status(200).send(questions);
  } catch (error) {
    next(error);
  }
}
