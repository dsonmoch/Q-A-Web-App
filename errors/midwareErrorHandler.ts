import ErrorHandler from "./apiErrorHandler";
import {  Request, Response, NextFunction } from "express";

const errorHandler = (err: TypeError | ErrorHandler , req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorHandler) {
    res.status(400).send({
      sucess: false,
      message: err.message,
      data: {},
    });
    return;
  }
  res.status(500).send({
    sucess: false,
    message: "Internal Server Error",
    data: {},
  });
};

export default errorHandler;
