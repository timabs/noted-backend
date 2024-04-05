import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connect";
import NotesRouter from "./routes/NotesRouter";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v1/notes", NotesRouter);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI!);
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
