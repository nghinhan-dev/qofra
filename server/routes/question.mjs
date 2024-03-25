import express from "express";
import { generateQuestions } from "../controllers/question.mjs";
import { verifyToken } from "../middlewares/auth/verifyToken.mjs";

export const questionRoutes = express.Router();

questionRoutes.use(verifyToken).post("/generate", generateQuestions);
