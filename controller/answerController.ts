import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import ErrorHandler  from"../errors/apiErrorHandler";
import queryExecuter  from"../utilities/db-config.js";
import {
  getUserId,
  answerQueryConstructor,
  searchAnswerQueryConstructor,
}  from"./helpers/queryConstructor";
import responseConstructor  from"./helpers/responseConstructor";
import genereateId  from"./helpers/idGenerator";
import getPostId  from"./helpers/getPostId";

dotenv.config();
const answerPost = async (req: Request, res: Response, next: NextFunction) => {
  const userInput = req.query;
  const { postId, answer } = userInput;
  const auth = req.headers.authorization;
  const authToken: any = auth?.split(" ")[1].toString();
  const privateKey: any = process.env.PrivateKey
  const decodedToken:any = jwt.verify(authToken, privateKey);
  const email = decodedToken.email;
  const answerId = genereateId();
  const userId = await getUserId(email);
  const sqlQuery = answerQueryConstructor();
  const params = [answerId, userId[0].user_id, postId, answer];
  const responseData = { answer: answer, answerId: answerId };

  const queryResult: any = await queryExecuter(sqlQuery, params);

  if (queryResult.affectedRows === 0) {
    next(ErrorHandler.serverError("There was an error in answering"));
  } else {
    res
      .status(200)
      .send(
        responseConstructor(responseData, `Answered to post: ${postId}`, false)
      );
  }
};

const searchAnswer = async (req: Request, res: Response, next: NextFunction) => {
  const userInput = req.query;
  const postId = await getPostId(userInput);
  const sqlQuery = searchAnswerQueryConstructor(userInput);
  var params = [postId];
  const responseData = { Question: userInput.questionTitle, postId: postId };

  const queryResult: any = await queryExecuter(sqlQuery, params);
  if (queryResult.length === 0) {
    next(
      ErrorHandler.serverError("There is no answer related to this question")
    );
  } else {
    res
      .status(200)
      .send(responseConstructor(queryResult[0], responseData, false));
  }
};

export {answerPost, searchAnswer} ;
