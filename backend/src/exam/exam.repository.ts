import { BaseRepository } from "../common/repository/base.repository";
import { Exam } from "./exam.model";
import { ExamDocument, examModel } from "./exam.schema";

class ExamRepository extends BaseRepository<ExamDocument, Exam> {
  EXM_POPULATION_STAGE = [
    {
      $lookup: {
        from: "students",
        localField: "student",
        foreignField: "_id",
        as: "student",
      },
    },
    {
      $unwind: {
        path: "$student",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  constructor() {
    super(examModel);
  }
}

export const examRepository = new ExamRepository();
