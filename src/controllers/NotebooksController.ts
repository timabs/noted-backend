import NotebooksModel from "../models/NotebooksModel";
import NotesModel from "../models/NotesModel";
import { Response } from "express";
import { NotesRequest } from "./NotesController";
import mongoose from "mongoose";

const NotebooksBase = NotebooksModel;
const NotesBase = NotesModel;

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
    const { notebookId } = req.params;
    const { noteId: noteToAddId } = req.body;
    const noteAdded = await NotebooksBase.findByIdAndUpdate(
      notebookId,
      {
        $push: { notes: noteToAddId },
      },
      { new: true }
    );
    await NotesBase.findByIdAndUpdate(noteToAddId, {
      $push: { notebooksPartOf: notebookId },
    });
    res.status(201).json(noteAdded);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error adding note to notebook: ${error}` });
  }
};

export const fetchNotesInNotebook = async (
  req: NotesRequest,
  res: Response
) => {
  try {
    const { notebookId } = req.params;
    const notebookWithNotes = await NotebooksBase.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(notebookId) } },
      {
        $lookup: {
          from: "Notes",
          localField: "notes",
          foreignField: "_id",
          as: "fullNotes",
        },
      },
      { $sort: { "fullNotes.updatedAt": -1 } },
      // {
      //   $group: {
      //     _id: '$_id',

      //   }
      // }
    ]);
    res.status(201).json(notebookWithNotes[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching notes in notebook: ${error}` });
  }
};
