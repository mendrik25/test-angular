import { ObjectId } from "mongoose";
import { Student } from "../student/student.model";

export interface Exam {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id: any;
  student: Student | ObjectId;
  examPlace?: string;
  examDate: Date;
  examTime: string;
  status: string;
}
