import type { Request } from "express";
import { ObjectId } from "mongoose";

export interface IUserDetail {
  image?: {
    originalName?: string | null;
    filename?: string | null;
    size?: number | null;
    destination?: string | null;
  } | null;
  _id: string;
  firstName: string;
  maidenName?: string | null;
  lastName: string;
  email: string;
  username: string;
  phone?: string | null;
  role: string;
}

export interface AuthRequest extends Request {
  loggedInUser?: IUserDetail
}