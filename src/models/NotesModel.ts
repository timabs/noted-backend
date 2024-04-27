import mongoose from "mongoose";

const dateOptions: Intl.DateTimeFormatOptions = {
  month: "long",
  day: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

export const NoteSchema = new mongoose.Schema({
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
    default: new Date().toLocaleString("en-US").replace("at", "-"),
  },
});

export default mongoose.model("NotesModel", NoteSchema, "Notes");
