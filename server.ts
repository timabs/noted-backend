import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    //TODO: setup mongodb for noted, write func for connect to db, await connectDB() here
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
