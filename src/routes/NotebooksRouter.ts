import express from "express";
import {
  addNoteToNotebook,
  createNotebook,
  getNotebooks,
} from "../controllers/NotebooksController";

const NotebooksRouter = express.Router();

NotebooksRouter.route("/").get(getNotebooks).post(createNotebook);
NotebooksRouter.route("/:notebookId").patch(addNoteToNotebook);

export default NotebooksRouter;
