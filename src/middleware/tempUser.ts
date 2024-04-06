import express, { Request, Response, NextFunction } from "express";

export interface NotesRequest extends Request {
  tempUser?: string;
}
export const tempUser = (
  req: NotesRequest,
  res: Response,
  next: NextFunction
) => {
  const tempUser = req.headers["x-temp-user"] as string;
  req.tempUser = tempUser;
  next();
};
