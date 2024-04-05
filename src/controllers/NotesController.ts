import mongoose from "mongoose";
import NotesModel from "../models/NotesModel";
import express, { Request, Response } from "express";
const NotesBase = NotesModel;

export const getNotes = async (req: Request, res: Response) => {
  try {
    //TO-DO: Replace with temp user ID and auth handling

    const { userId } = req.params;
    const notes = await NotesBase.find({ user: userId });
    res.status(201).json({ notes });
  } catch (error) {
    res.status(500).json({ msg: `Error fetching notes: ${error}` });
  }
};
