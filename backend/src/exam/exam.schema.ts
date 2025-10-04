import mongoose from "mongoose";
import { Exam } from "./exam.model";

export interface ExamDocument extends Exam, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

const schema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  examPlace: { type: String, require: false },
  examDate: { type: Date, required: true },
  examTime: { type: String, require: true },
  status: { type: String, require: true },
});

const fieldsToPopulate = "student";

schema.pre("find", function () {
  this.populate(fieldsToPopulate);
});

schema.pre("findOne", function () {
  this.populate(fieldsToPopulate);
});

export const examModel = mongoose.model<ExamDocument>("Exam", schema);
