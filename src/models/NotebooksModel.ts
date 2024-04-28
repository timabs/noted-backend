import mongoose from "mongoose";
import { NoteSchema } from "./NotesModel";

const NotebookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  title: {
    type: String,
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NotesModel",
    },
  ],
});

export default mongoose.model("NotebooksModel", NotebookSchema, "Notes");
