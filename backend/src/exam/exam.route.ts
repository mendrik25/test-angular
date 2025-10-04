import { Router } from "express";
import { examController } from "./exam.controller";

class ExamRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router
      .route("/")
      .get(examController.getAll.bind(examController))
      .post(examController.create.bind(examController));
    this.router
      .route("/:examId")
      .get(examController.getById.bind(examController))
      .put(examController.update.bind(examController))
      .delete(examController.delete.bind(examController));
  }
}

const examRouter = new ExamRouter();

export const examRoutes = examRouter.router;
