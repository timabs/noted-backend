import mongoose from "mongoose";
import NotesModel from "../models/NotesModel";
import express, { Request, Response } from "express";
const NotesBase = NotesModel;

export interface NotesRequest extends Request {
  tempUser?: string;
}

export const getNotes = async (req: NotesRequest, res: Response) => {
  try {
    //TO-DO: Replace with temp user ID and auth handling
    const userId = req.tempUser;
    const notes = await NotesBase.find({ user: userId });
    res.status(201).json({ notes });
  } catch (error) {
    res.status(500).json({ msg: `Error fetching notes: ${error}` });
  }
};
export const createNote = async (req: NotesRequest, res: Response) => {
  try {
    const userId = req.tempUser;
    const { note } = req.body;
    const noteData = {
      user: userId,
      title: note.title,
      content: note.content,
      date: note.date,
    };
    const createdNote = await NotesBase.create(noteData);
    res.status(201).json(createdNote);
  } catch (error) {
    res.status(500).json({ message: `Error creating note: ${error}` });
  }
};

export const deleteNote = async (req: NotesRequest, res: Response) => {
  try {
    const userId = req.tempUser;
    const { noteId } = req.params;
    const deletedNote = await NotesBase.deleteOne({ _id: noteId });
    res.status(200).json(deletedNote);
  } catch (error) {
    res.status(500).json({ message: `Error deleting note ${error}` });
  }
};

export const editNote = async (req: NotesRequest, res: Response) => {
  try {
    const userId = req.tempUser;
    const { note } = req.body;
    const { noteId } = req.params;

    const updatedNote = await NotesBase.findByIdAndUpdate(noteId, note, {
      new: true,
    });
    res.status(201).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: `Error updating note ${error}` });
  }
};
