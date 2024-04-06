import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connect";
import cors from "cors";
//routers
import NotesRouter from "./routes/NotesRouter";
import { tempUser } from "./middleware/tempUser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
//cors setup
const whitelist = ["http://localhost:5173"];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());
app.use(tempUser);
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
