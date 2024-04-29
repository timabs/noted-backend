import NotebooksModel from "../models/NotebooksModel";
import { Response } from "express";
import { NotesRequest } from "./NotesController";
import mongoose from "mongoose";

const NotebooksBase = NotebooksModel;

export const getNotebooks = async (req: NotesRequest, res: Response) => {
  try {
    const userId = req.tempUser;
    const notebooks = await NotebooksBase.find({ user: userId });
    res.status(201).json({ notebooks });
  } catch (error) {
    res.status(500).json({ message: `Error retrieving notebooks: ${error}` });
  }
};

interface NotebookDataObj {
  user: string | undefined;
  title: string;
  notes?: Array<mongoose.Schema.Types.ObjectId> | undefined;
}

export const createNotebook = async (req: NotesRequest, res: Response) => {
  try {
    const userId = req.tempUser;
    const { notebook } = req.body;
    const notebookData: NotebookDataObj = {
      user: userId,
      title: notebook.title,
      notes: notebook.notes,
    };
    const createdNotebook = await NotebooksBase.create(notebookData);
    res.status(201).json(createdNotebook);
  } catch (error) {
    res.status(500).json({ message: `Error creating notebook: ${error}` });
  }
};

export const addNoteToNotebook = async (req: NotesRequest, res: Response) => {
  try {
    const { notebookId, noteToAddId } = req.body;
    const noteAdded = await NotebooksBase.findByIdAndUpdate(notebookId, {
      $push: { notes: noteToAddId },
    });
    res.status(201).json(noteAdded);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error adding note to notebook: ${error}` });
  }
};
