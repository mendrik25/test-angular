import { Request, Response, NextFunction } from "express";
import { ControllerRead } from "../common/controller/controller-read.interface";
import { ControllerWrite } from "../common/controller/controller-write.interface";
import { wrapToSendBackResponse } from "../shared/wrap-to-send-back-response";
import { Exam } from "./exam.model";
import { examService } from "./exam.service";

class ExamController implements ControllerRead, ControllerWrite {
  create(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Exam>(examService.create(req.body), res, next);
  }
  delete(_req: Request, _res: Response, _next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
  update(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Exam | null>(
      examService.update(req.params.examId, req.body),
      res,
      next
    );
  }
  getPaginatedList(_req: Request, _res: Response, _next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
  getById(_req: Request, _res: Response, _next: NextFunction): void {
    throw new Error("Method not implemented.");
  }

  getAll(_req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Exam[]>(examService.getAll(), res, next);
  }
}

export const examController = new ExamController();
