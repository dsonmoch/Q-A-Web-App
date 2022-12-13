import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../errors/apiErrorHandler";
import queryExecuter from "../utilities/db-config.js";
import {
  getUserId,
  createPostQueryConstructor,
  updatePostQueryConstructor,
  deletePostQueryConstructor,
  searchPostQueryConstructor,
} from "./helpers/queryConstructor";
import responseConstructor from "./helpers/responseConstructor";
import genereateId from "./helpers/idGenerator";
import getParameter from "./helpers/getParameter";

dotenv.config();

const createPost = async (req: Request, res : Response, next: NextFunction, ) => {
  const userInput = req.query;
  const { title, description, tags } = userInput;
  let params = Object.values(userInput);
  const auth = req.headers.authorization;
  const authToken:any = auth?.split(" ")[1].toString();
  const privateKey: any = process.env.PrivateKey
  const decodedToken:any = jwt.verify(authToken, privateKey);
  const email = decodedToken.email;
  const userId = await getUserId(email);
  const sqlQuery = createPostQueryConstructor();
  const postId = genereateId();
  params.unshift(postId, userId[0].user_id);

  const queryResult:any = await queryExecuter(sqlQuery, params);
  if (queryResult.length === 0) {
    next(ErrorHandler.serverError("Error in post Insertion"));
  } else {
    res
      .status(200)
      .send(
        responseConstructor(
          { userInput, userId: userId[0].user_id },
          "Post Created!",
          false
        )
      );
  }
};

const updatePost = async (req: Request, res : Response, next: NextFunction) => {
  const userInput = req.query;
  var params = Object.values(userInput);
  const auth = req.headers.authorization;
  const authToken:any = auth?.split(" ")[1].toString();
  const privateKey: any = process.env.PrivateKey
  const decodedToken:any = jwt.verify(authToken, privateKey);
  const email = decodedToken.email;
  const userId = await getUserId(email);
  const sqlQuery = updatePostQueryConstructor(userInput);
  params.push(userId[0].user_id);

  const queryResult: any = await queryExecuter(sqlQuery, params);
  if (queryResult.affectedRows === 0) {
    next(
      ErrorHandler.serverError("No post Found or You cannot update this post")
    );
  } else {
    res
      .status(200)
      .send(responseConstructor(userInput, "Post Updated!", false));
  }
};

const deletePost = async (req: Request, res : Response, next: NextFunction) => {
  const { postId } = req.query;
  const auth = req.headers.authorization;
  const authToken:any = auth?.split(" ")[1].toString();
  const privateKey: any = process.env.PrivateKey
  const decodedToken:any = jwt.verify(authToken, privateKey);
  const email = decodedToken.email;
  const userId = await getUserId(email);
  const params = [userId[0].user_id, postId];
  const sqlQuery = deletePostQueryConstructor();
  const responseData = {
    postId: postId,
    userId: userId[0].user_id,
    email: email,
  };

  const queryResult:any = await queryExecuter(sqlQuery, params);
  if (queryResult.length === 0) {
    next(ErrorHandler.serverError("You cannot delete this post"));
  } else {
    res
      .status(200)
      .send(responseConstructor(responseData, "Post Deleted!", false));
  }
};

const searchPost = async (req: Request, res : Response, next: NextFunction) => {
  const userInput = req.query;
  var params = getParameter(userInput);
  const sqlQuery = searchPostQueryConstructor(userInput);
  const queryResult: any = await queryExecuter(sqlQuery, params);
  if (queryResult.length === 0) {
    next(ErrorHandler.serverError("No post related to search"));
  } else {
    res
      .status(200)
      .send(responseConstructor(queryResult, "Search Result!", false));
  }
};

export {
  createPost,
  updatePost,
  deletePost,
  searchPost,
};
