import express from "express";
import {
  createNote,
  deleteNote,
  getNotes,
} from "../controllers/NotesController";

const NotesRouter = express.Router();

NotesRouter.route("/").get(getNotes).post(createNote);
NotesRouter.route("/:noteId").delete(deleteNote);
export default NotesRouter;
