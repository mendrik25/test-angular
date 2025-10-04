import { ServiceWrite } from "../common/service/service-write.interface";
import { Exam } from "./exam.model";
import { examRepository } from "./exam.repository";

class ExamService implements ServiceWrite<Exam> {
  async create(item: Exam): Promise<Exam> {
    delete item._id;
    const createdExam = await examRepository.create(item);
    await createdExam.populate("student");
    return createdExam;
  }
  getAll(): Promise<Exam[]> {
    return examRepository.find({}).exec();
  }
  delete(_id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async update(_id: string, _item: Exam): Promise<Exam | null> {
    const updatedExam = await examRepository.update(_id, _item);
    await updatedExam!.populate("student");
    return updatedExam;
  }
}

export const examService = new ExamService();
