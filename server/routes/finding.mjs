import express from "express";
import { upload } from "../lib/multer.mjs";
import { createFinding, getFindings } from "../controllers/finding.mjs";

export const router = express.Router();

router
  .post("/postImages", upload.single("findingImage"), createFinding)
  .get("/getImages", getFindings);
