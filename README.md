# Q&A Forum

```
## Question and Answer Web app with following features:

- Sign In
- Create Post
- Update Post
- Delete Post
- Search Post
- Answer Post
- Seach Answer
```

```
## Dependencies
- Express
- JsonWebToken
- md5
- mysql2
- dotenv
- joi
- zlib

## Install
-git clone -b node-usecase2-davidson git@github.com:ncompass-ts/l1-swift.git
npm install
npm start
```

```
- Language: Nodejs,

- Framework: Express,

- Database: Mysql,

- Endpoints:
```

```
## Login Endpoint: http://localhost:PORT/signin

- Method: POST
- Authentication: YES
- Parameters: email, password

## CreatePost Endpoint: http://localhost:PORT/post/create-post

- Method: POST
- Authentication: YES
- Parameters: title, description, tags
- ContentType: appliction-json

## UpdatePost Endpoint: http://localhost:PORT/post/update-post

- Method: POST
- Authentication: YES
- Parameters: title, description, tags, postId(required)
- ContentType: application-json

## DeletePost Endpoint: http://localhost:PORT/post/delete-post

- Method: GET
- Authentication: YES
- Parameters: postId(required)
- ContentType: application-json

## SearchPost Endpoint: http://localhost:PORT/post/search

- Method: GET
- Authentication: NO
- Parameters: title, tags, item(required), page(required)
- ContentType: application-json

## AnswerPost Endpoint: http://localhost:PORT/answer/answer-post

- Method: GET
- Authentication: YES
- Parameters: postId(required), answer
- ContentType: application-json

## SearchAnswer Endpoint: http://localhost:PORT/answer/search-answer

- Method: GET
- Authentication: NO
- Parameters: questionTitle, fields(answer, answer_id,user_id,time)
- ContentType: application-json
```
