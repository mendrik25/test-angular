import { Router } from "express";
import { authenticationRoutes } from "../authentication/authentication.routes";
import { privilegeRoutes } from "../privilege/privilege.route";
import { roleRoutes } from "../role/role.route";
import { studentRoutes } from "../student/student.route";
import { examRoutes } from "../exam/exam.route";
import passport from "passport";

class AppRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get("/api-status", (_req, res) => {
      res.json({ status: "OK" });
    });
    this.router.use("/authentication", authenticationRoutes);
    this.router.use(
      "/role",
      passport.authenticate("jwt", { session: false }),
      roleRoutes
    );
    this.router.use(
      "/privilege",
      passport.authenticate("jwt", { session: false }),
      privilegeRoutes
    );
    this.router.use(
      "/students",
      passport.authenticate("jwt", { session: false }),
      studentRoutes
    );
    this.router.use(
      "/exams",
      passport.authenticate("jwt", { session: false }),
      examRoutes
    );
  }
}

const appRouter = new AppRouter();
export const appRoutes = appRouter.router;
