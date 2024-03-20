import express from "express";
import { upload } from "../lib/multer.mjs";
import { createFinding, getFindings } from "../controllers/finding.mjs";

export const findingRoutes = express.Router();

findingRoutes
  .post("/postImages", upload.single("findingImage"), createFinding)
  .get("/getImages", getFindings);
