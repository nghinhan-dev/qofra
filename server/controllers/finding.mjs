import Finding from "../models/Finding.mjs";
import { uploadImg } from "../lib/sharp.mjs";
import { createError } from "../utils/createError.mjs";
import fs from "fs";

export async function createFinding(req, res, next) {
  try {
    await uploadImg(req.file);
    res.status(200).send({ message: "Uploaded" });
  } catch (error) {
    console.log("error:", error);
    res.status(400).send({ error: "error" });
  }
}

export async function getFindings(req, res, next) {
  try {
    fs.readFile(
      `/dev web/qofra/server/data/images/37492752-50df-446b-9ba7-6ca332ee459c.jpg`,
      "base64",
      (err, data) => {
        res.status(200).send({ content: data });
      }
    );
  } catch (error) {
    next(error);
  }
}
