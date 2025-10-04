import { NextFunction, Request, Response } from "express";
import { ControllerRead } from "../common/controller/controller-read.interface";
import { wrapToSendBackResponse } from "../shared/wrap-to-send-back-response";
import { Student } from "./student.model";
import { studentService } from "./student.service";
import { ControllerWrite } from "../common/controller/controller-write.interface";

class StudentController implements ControllerRead, ControllerWrite {
  create(_req: Request, _res: Response, _next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
  delete(_req: Request, _res: Response, _next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
  update(_req: Request, _res: Response, _next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
  getPaginatedList(_req: Request, _res: Response, _next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
  getById(_req: Request, _res: Response, _next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
  getAll(_req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Student[]>(studentService.getAll(), res, next);
  }
}

export const studentController = new StudentController();
