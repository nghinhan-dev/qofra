import Finding from "../models/Finding.mjs";
import User from "../models/User.mjs";
import { uploadImages } from "../lib/firebase.mjs";
import { dueDateCalculator } from "../lib/date-fns.mjs";
import { sendMail } from "../lib/nodeMailer.mjs";
import { createError } from "../utils/createError.mjs";
// import { createError } from "../utils/createError.mjs";
// import fs from "fs";

export async function createFinding(req, res, next) {
  try {
    const { questionID, scope, process, picID, desc } = req.body;
    let results;
    if (req.files.length !== 0) {
      results = await uploadImages(req.files);
    } else {
      results = [];
    }

    const pic = await User.findById(picID);
    if (!pic) throw createError(404, "Cannot find person in charge");

    const foundDate = new Date();
    const dueDate = dueDateCalculator(Date.now(), scope);

    const newFinding = new Finding({
      question: questionID,
      foundDate: foundDate,
      dueDate: dueDate,
      reporter: req.user._id,
      personInCharge: pic._id,
      desc: desc,
      images: results,
      status: "Ongoing",
    });

    await sendMail(
      req.user.fullName,
      pic,
      { foundDate, dueDate, desc },
      { process, scope }
    );

    // await newFinding.save();

    res.status(200).send({ message: "Uploaded", finding: newFinding });
  } catch (error) {
    next(error);
  }
}

export async function getFindings(req, res, next) {
  try {
    const findingId = req.params.findingID;

    const finding = await Finding.findById(findingId);

    res.send({ finding: finding });
  } catch (error) {
    console.log("error:", error);
    next(error);
  }
}
