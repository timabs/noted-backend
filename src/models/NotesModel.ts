import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("NotesModel", NoteSchema, "Notes");
