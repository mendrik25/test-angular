import mongoose from "mongoose";
import { Student } from "./student.model";

export interface StudentDocument extends Student, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

export const studentModel = mongoose.model<StudentDocument>("Student", schema);
