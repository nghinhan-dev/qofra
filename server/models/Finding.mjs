import mongoose from "mongoose";

const { Schema } = mongoose;

const findingSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
  foundDate: Date,
  dueDate: Date,
  completionDate: Date,
  action: String,
  detector: String,
  personInCharge: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  desc: String,
  images: [String],
  status: {
    type: String,
    enum: {
      values: ["Ongoing", "Orverdue", "Done"],
      message: "{VALUE} is not supported",
    },
  },
});

const Finding = new mongoose.model("Finding", findingSchema);

export default Finding;
