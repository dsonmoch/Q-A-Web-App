import * as express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  searchPost,
}from "../controller/postController";
import {
  createPostInputValidator,
  updatePostInputValidator,
  deletePostInputValidator,
  searchPostInputValidator,
} from "../validation/inputValidation";
import authenticateUser from "../authentication/authenticateUser";


let postRouter = express.Router()
postRouter.post(
  "/create-post",
  createPostInputValidator,
  authenticateUser,
  createPost
);
postRouter.post(
  "/update-post",
  updatePostInputValidator,
  authenticateUser,
  updatePost
);

postRouter.get(
  "/delete-post",
  deletePostInputValidator,
  authenticateUser,
  deletePost
);

postRouter.get("/search", searchPostInputValidator, searchPost);

export default postRouter;
