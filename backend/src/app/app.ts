import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import { Server } from "http";
import morgan from "morgan";
import passport from "./app.authentication";
import { errorMiddleware } from "./app.error-middleware";
import { morganStream } from "./app.logger";
import { appRoutes } from "./app.routes";
import cors from "cors";

export class App {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
  }

  public init(port: number): Server {
    this.enableCors();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorMiddlewares();

    return this.app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }

  private initMiddlewares() {
    this.app.use(passport.initialize());
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(morgan("combined", { stream: morganStream }));
  }

  private initRoutes() {
    this.app.use("/api/v1", appRoutes);
  }

  private initErrorMiddlewares() {
    this.app.use(errorMiddleware);
  }

  private enableCors() {
    this.app.use(cors());
  }
}

export const app = new App();
