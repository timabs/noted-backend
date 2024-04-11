import express from "express";
import { createNote, getNotes } from "../controllers/NotesController";

const NotesRouter = express.Router();

NotesRouter.route("/").get(getNotes).post(createNote);

export default NotesRouter;
