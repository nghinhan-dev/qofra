import express from "express";
import { upload } from "../lib/multer.mjs";
import {
  createFinding,
  getChartData,
  getDetailFinding,
  getFindings,
  resolveFinding,
} from "../controllers/finding.mjs";
import { verifyToken } from "../middlewares/auth/verifyToken.mjs";
import { fileValidate } from "../middlewares/validation/fileValidate.mjs";
import { body } from "express-validator";

export const findingRoutes = express.Router();

findingRoutes.get("/chart", getChartData);

findingRoutes
  .use(verifyToken)
  .post("/create", upload.array("findingImages"), fileValidate, createFinding)
  .get("/", getFindings)
  .get("/:findingID", getDetailFinding)
  .post("/:findingID", body("action").isString({ min: 10 }), resolveFinding);
