import express from "express";
import {
  addNoteToNotebook,
  createNotebook,
  fetchNotesInNotebook,
  getNotebooks,
} from "../controllers/NotebooksController";

const NotebooksRouter = express.Router();

NotebooksRouter.route("/").get(getNotebooks).post(createNotebook);
NotebooksRouter.route("/:notebookId")
  .get(fetchNotesInNotebook)
  .patch(addNoteToNotebook);

export default NotebooksRouter;
