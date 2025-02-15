import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URL = process.env.MONGODB_URL;

export const connectDB = async () =>  {
    await mongoose.connect(URL).then(() => console.log("Server connection established successfully"));
}