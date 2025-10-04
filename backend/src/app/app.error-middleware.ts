import * as express from "express";
import { HttpException } from "../shared/types/http-exception.interface";

export const errorMiddleware = (
  err: HttpException,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Une erreur est survenue";
  const stack = err.stack;
  res.status(status).send({
    message,
    stack,
  });
};
