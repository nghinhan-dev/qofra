import express from "express";
import { upload } from "../lib/multer.mjs";
import { createFinding, getFindings } from "../controllers/finding.mjs";
import { verifyToken } from "../middlewares/auth/verifyToken.mjs";
import { fileValidate } from "../middlewares/validation/fileValidate.mjs";

export const findingRoutes = express.Router();

findingRoutes
  .use(verifyToken)
  .post("/create", upload.array("findingImages"), fileValidate, createFinding)
  .get("/", getFindings);
