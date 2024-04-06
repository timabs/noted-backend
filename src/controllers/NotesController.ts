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
