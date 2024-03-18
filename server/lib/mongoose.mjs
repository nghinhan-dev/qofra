import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_KEY);
    console.log("Connected to DB 💾");
  } catch (error) {
    console.log("error:", error);
  }
}
