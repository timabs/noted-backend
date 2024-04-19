import mongoose from "mongoose";

const NotebookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  title: {
    type: String,
  },
  notes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NotesModel",
  },
});
