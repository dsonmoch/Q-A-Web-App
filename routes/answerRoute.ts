import * as express from "express";
import { answerPost, searchAnswer } from "../controller/answerController";
import {
  answerPostInputValidator,
  searchAnswerInputValidator,
} from "../validation/inputValidation";
import authenticateUser from "../authentication/authenticateUser";

let answerRouter =express.Router();

answerRouter.get(
  "/answer-post",
  authenticateUser,
  answerPostInputValidator,
  answerPost
);
answerRouter.get("/search-answer", searchAnswerInputValidator, searchAnswer);

export default answerRouter;
