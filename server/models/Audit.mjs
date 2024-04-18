import mongoose from "mongoose";

const { Schema } = mongoose;

const auditSchema = new Schema(
  {
    process: {
      type: String,
      enum: {
        values: ["Crushing", "Mixing", "Extruder", "Mold Setter"],
        message: "{VALUE} is not supported",
      },
    },
    createAt: Date,
  },
  {
    versionKey: false,
  }
);

const Audit = new mongoose.model("Audit", auditSchema);

export default Audit;
