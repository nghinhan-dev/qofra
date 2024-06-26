import User from "../models/User.mjs";
import Finding from "../models/Finding.mjs";
import Question from "../models/Question.mjs";
import { sendMail } from "../lib/nodeMailer.mjs";
import { uploadImages } from "../lib/firebase.mjs";
import { createError } from "../utils/createError.mjs";
import { dueDateCalculator } from "../lib/date-fns.mjs";
// import fs from "fs";

export async function createFinding(req, res, next) {
  try {
    const { questionID, picID, desc } = req.body;
    const foundDate = new Date();

    // pic = person in charge
    const pic = await User.findById(picID);
    if (!pic) throw createError(404, "Cannot find person in charge");

    // update question state
    const question = await Question.findByIdAndUpdate(
      questionID,
      {
        hasIssue: true,
        lastTimeAudit: foundDate,
      },
      { new: true }
    );
    if (!question) throw createError(404, "Cannot find question");

    // upload images to cloud
    let results;
    if (req.files.length !== 0) {
      results = await uploadImages(req.files);
    } else {
      results = [];
    }

    const dueDate = dueDateCalculator(Date.now(), question.scope);

    // create new finding
    const newFinding = new Finding({
      question: questionID,
      foundDate: foundDate,
      dueDate: dueDate,
      detector: req.user.fullName,
      personInCharge: pic._id,
      desc: desc,
      images: results.map((promise) => promise.value),
      status: "Ongoing",
    });

    // add task to p.i.c
    pic.findings.push(newFinding._id);
    await pic.save();

    // send notify email
    await sendMail(
      req.user.fullName,
      pic,
      { foundDate, dueDate, desc },
      { process: question.process, scope: question.scope }
    );

    await newFinding.save();

    res.status(200).send({ message: "Uploaded finding", finding: newFinding });
  } catch (error) {
    next(error);
  }
}

export async function getFindings(req, res, next) {
  try {
    const rawFindings = await Finding.find(
      {},
      "-images -__v -foundDate "
    ).exec();
    const findings = await Finding.populate(rawFindings, [
      {
        path: "question",
        select: "process -_id",
      },
      {
        path: "personInCharge",
        select: "fullName -_id",
      },
    ]);

    res.status(200).send(findings.sort((a, b) => b.dueDate - a.dueDate));
  } catch (error) {
    next(error);
  }
}

export async function getDetailFinding(req, res, next) {
  try {
    const findingID = req.params.findingID;

    const finding = await Finding.findById(findingID).populate([
      {
        path: "question",
      },
      {
        path: "personInCharge",
      },
    ]);

    const isPIC =
      req.user.fullName === finding.personInCharge.fullName ||
      req.user.role === "ADMIN";

    if (!finding) throw createError(404, "Cannot find Finding with given id");

    res.status(200).send({
      finding,
      isPIC,
    });
  } catch (error) {
    next(error);
  }
}

export async function resolveFinding(req, res, next) {
  try {
    const findingID = req.params.findingID;
    const action = req.body.action;
    await Finding.findByIdAndUpdate(findingID, {
      action: action,
      status: "Done",
    });

    res.status(200).send({ message: "Success" });
  } catch (error) {
    next(error);
  }
}

export async function getChartData(req, res, next) {
  try {
    const chart = await Finding.drawChart();

    res.status(200).send(chart);
  } catch (error) {
    next(error);
  }
}
