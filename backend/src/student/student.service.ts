import { ServiceWrite } from "../common/service/service-write.interface";
import { Student } from "./student.model";
import { studentRepository } from "./student.repository";

class StudentService implements ServiceWrite<Student> {
  create(_item: Student): Promise<Student> {
    throw new Error("Method not implemented.");
  }
  delete(_id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  update(_id: string, _item: Student): Promise<Student | null> {
    throw new Error("Method not implemented.");
  }

  getAll(): Promise<Student[]> {
    return studentRepository.find({}).exec();
  }
}

export const studentService = new StudentService();
