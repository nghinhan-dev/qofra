import express from "express";
import { upload } from "../lib/multer.mjs";
import {
  addQuestions,
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
  .get("/", paginate)
  .post("/add", upload.single("excelFile"), addQuestions);
