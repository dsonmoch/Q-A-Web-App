import * as joi from "joi";

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(4).required(),
});

const createPostSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  tags: joi.string(),
});

const updatePostSchema = joi.object({
  title: joi.string(),
  description: joi.string(),
  tags: joi.string(),
  postId: joi.string().alphanum().required(),
});

const deletePostSchema = joi.object({
  postId: joi.string().alphanum().max(32).min(32).required(),
});

const searchPostSchema = joi.object({
  title: joi.string(),
  tags: joi.string(),
  items: joi.number().required(),
  page: joi.number().required(),
});

const answerPostSchema = joi.object({
  postId: joi.string().alphanum().max(32).min(32),
  answer: joi.string().max(200).required(),
});

const searchAnswerSchema = joi.object({
  questionTitle: joi.string().required(),
  fields: joi.string(),
});

export  {
  loginSchema,
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
  searchPostSchema,
  answerPostSchema,
  searchAnswerSchema,
};
