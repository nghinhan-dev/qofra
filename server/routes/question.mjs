import express from "express";
import { generateQuestions } from "../controllers/question.mjs";

export const router = express.Router();

router.post("/questions", generateQuestions);
