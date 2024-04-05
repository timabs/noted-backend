import express from "express";
import { getNotes } from "../controllers/NotesController";

const NotesRouter = express.Router();

NotesRouter.route("/:userId").get(getNotes);

export default NotesRouter;
