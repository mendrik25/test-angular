import { Router } from "express";
import { studentController } from "./student.controller";

class StudentRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router
      .route("/")
      .get(studentController.getAll.bind(studentController));
  }
}

const studentRouter = new StudentRouter();

export const studentRoutes = studentRouter.router;
