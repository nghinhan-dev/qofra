import Question from "../models/Question.mjs";

export async function generateQuestions(req, res, next) {
  try {
    const nestedQuestions = await Question.generateQuestions(req.body);

    const questions = nestedQuestions.map((obj) => obj.question[0]);

    res.status(200).send(questions);
  } catch (error) {
    next(error);
  }
}
