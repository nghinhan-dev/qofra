import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  fullName: String,
  email: String,
  role: {
    type: String,
    enum: {
      values: ["TL", "HOD", "BOD", "ADMIN"],
      message: "{VALUE} is not supported",
    },
  },
  findings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Finding",
      default: [],
    },
  ],
});

const User = new mongoose.model("User", userSchema);

export default User;
