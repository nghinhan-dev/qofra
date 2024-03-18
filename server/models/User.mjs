import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: String,
  email: String,
  role: String,
  findings: [
    {
      type: ObjectId,
      ref: "Finding",
      default: [],
    },
  ],
});

const User = new mongoose.model("User", userSchema);

export default User;
