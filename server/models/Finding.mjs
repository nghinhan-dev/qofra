import mongoose from "mongoose";

const { Schema } = mongoose;

const findingSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
  foundDate: Date,
  dueDate: Date,
  reporter: String,
  personInCharge: String,
  desc: String,
  images: [Buffer],
  status: String,
});

const Finding = new mongoose.model("Finding", findingSchema);

export default Finding;
