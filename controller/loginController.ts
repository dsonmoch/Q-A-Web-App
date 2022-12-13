import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import  ErrorHandler from "../errors/apiErrorHandler";
import  queryExecuter from "../utilities/db-config.js";
import { loginQuery } from "./helpers/queryConstructor";
import decryptPassword from "../utilities/decryptPassword";
import responseConstructor from "./helpers/responseConstructor";

dotenv.config();

const signin = async (req: Request, res: Response, next: NextFunction) => {
  const userInput = req.query;
  const password = decryptPassword(userInput.password);
  const sqlQuery = loginQuery();
  const params = [userInput.email, password];

  const queryResult: any = await queryExecuter(sqlQuery, params);
  if (queryResult.length === 0) {
    next(ErrorHandler.serverError("Failed authentication"));
  } else {
    res.status(200).send(responseConstructor(queryResult, "Signed In", true));
  }
};

export default signin;
