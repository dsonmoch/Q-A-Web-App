import ErrorHandler from "../errors/apiErrorHandler";
import { Request, Response, NextFunction } from "express";
import  {
  loginSchema,
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
  searchPostSchema,
  answerPostSchema,
  searchAnswerSchema,
} from "./validationSchema";

const loginInputValidator = (req: Request, res: Response, next: NextFunction) => {
  const userInput = req.query;
  const result = loginSchema.validate(userInput);
  if (result.error) {
    next(ErrorHandler.validationError(result.error.message));
  } else {
    next();
  }
};

const createPostInputValidator = (req: Request, res: Response, next: NextFunction) => {
  const userInput = req.query;
  const result = createPostSchema.validate(userInput);
  if (result.error) {
    next(ErrorHandler.validationError(result.error.message));
  } else {
    next();
  }
};

const updatePostInputValidator = (req: Request, res: Response, next: NextFunction) => {
  const userInput = req.query;
  const result = updatePostSchema.validate(userInput);
  if (result.error) {
    next(ErrorHandler.validationError(result.error.message));
  } else {
    next();
  }
};

const deletePostInputValidator = (req: Request, res: Response, next: NextFunction) => {
  const userInput = req.query;
  const result = deletePostSchema.validate(userInput);
  if (result.error) {
    next(ErrorHandler.validationError(result.error.message));
  } else {
    next();
  }
};

const searchPostInputValidator = (req: Request, res: Response, next: NextFunction) => {
  const userInput = req.query;
  const result = searchPostSchema.validate(userInput);
  if (result.error) {
    next(ErrorHandler.validationError(result.error.message));
  } else {
    next();
  }
};

const answerPostInputValidator = (req: Request, res: Response, next: NextFunction) => {
  const userInput = req.query;
  const result = answerPostSchema.validate(userInput);
  if (result.error) {
    next(ErrorHandler.validationError(result.error.message));
  } else {
    next();
  }
};

const searchAnswerInputValidator = (req: Request, res: Response, next: NextFunction) => {
  const userInput = req.query;
  const result = searchAnswerSchema.validate(userInput);
  if (result.error) {
    next(ErrorHandler.validationError(result.error.message));
  } else {
    next();
  }
};

export {
  loginInputValidator,
  createPostInputValidator,
  updatePostInputValidator,
  deletePostInputValidator,
  searchPostInputValidator,
  answerPostInputValidator,
  searchAnswerInputValidator,
};
