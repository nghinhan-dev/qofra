import express from "express";
import {
  generateQuestions,
  paginate,
  passedQuestion,
  skipQuestion,
} from "../controllers/question.mjs";
import { verifyToken } from "../middlewares/auth/verifyToken.mjs";

export const questionRoutes = express.Router();

questionRoutes
  .use(verifyToken)
  .post("/generate", generateQuestions)
  .post("/skip", skipQuestion)
  .post("/passed/:questionID", passedQuestion)
  .get("/", paginate);
