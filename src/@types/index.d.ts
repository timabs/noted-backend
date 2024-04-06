export {};

declare global {
  namespace Express {
    export interface Request {
      tempUser?: string;
    }
  }
}
