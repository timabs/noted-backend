import express from "express";
import {
  createNotebook,
  getNotebooks,
} from "../controllers/NotebooksController";

const NotebooksRouter = express.Router();

NotebooksRouter.route("/").get(getNotebooks).post(createNotebook);

export default NotebooksRouter;
