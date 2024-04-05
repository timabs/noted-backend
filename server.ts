import express from "express";
import path from "path";
import { connectDB } from "./db/connectDB";
import "dotenv/config";
const app = express();
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI!);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
