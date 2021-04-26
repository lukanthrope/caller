import { Document } from 'mongoose';

export interface User extends Document {
  _id: string;
  password: string;
  email: string;
  about?: string;
  isOnline?: boolean
}