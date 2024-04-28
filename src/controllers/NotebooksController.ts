import NotebooksModel from "../models/NotebooksModel";
import { Request, Response } from "express";
import { NotesRequest } from "./NotesController";

const NotebooksBase = NotebooksModel;

export const getNotebooks = async (req: NotesRequest, res: Response) => {
  try {
    const userId = req.tempUser;
  } catch (error) {}
};
