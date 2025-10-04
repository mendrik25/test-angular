import { BaseRepository } from "../common/repository/base.repository";
import { Student } from "./student.model";
import { StudentDocument, studentModel } from "./student.schema";

class StudentRepository extends BaseRepository<StudentDocument, Student> {
  constructor() {
    super(studentModel);
  }
}

export const studentRepository = new StudentRepository();
