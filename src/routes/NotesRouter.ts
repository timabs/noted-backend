import express from "express";
import {
  createNote,
  deleteNote,
  editNote,
  getNotes,
} from "../controllers/NotesController";

const NotesRouter = express.Router();

NotesRouter.route("/").get(getNotes).post(createNote);
NotesRouter.route("/:noteId").delete(deleteNote).patch(editNote);
export default NotesRouter;
