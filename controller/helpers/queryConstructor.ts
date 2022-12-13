const queryExecuter = require("../../utilities/db-config");

const loginQuery = () => {
  const query =
    "select username, email from user where email = ? and password = ?";
  return query;
};

const getUserId = async (email: string) => {
  const sqlQuery = "select user_id from user where email = ?";
  const params = [email];
  const result = await queryExecuter(sqlQuery, params);
  return result;
};

const createPostQueryConstructor = () => {
  const sqlQuery =
    "insert into post (post_id,user_id, title, description, tag) values(?,?,?,?,?)";
  return sqlQuery;
};

const updatePostQueryConstructor = (userInput: any)=> {
  const { title, description, tags, postId } = userInput;
  var sqlQuery;
  if (!title && !description && !tags && postId) {
    sqlQuery =
      "update post set title = '', description = '', tag = '' where post_id = '' and user_id = ''";
    return sqlQuery;
  }
  if (!title && !description && tags) {
    sqlQuery = "update post set tag = ? where post_id = ? and user_id = ?";
    return sqlQuery;
  }
  if (!title && description && tags) {
    sqlQuery =
      "update post set description = ?, tag = ? where post_id = ? and user_id = ?";
    return sqlQuery;
  }
  if (!description && !tags && title) {
    sqlQuery = "update post set title = ? where post_id = ? and user_id = ?";
    return sqlQuery;
  }
  if (!title && !tags && description) {
    sqlQuery =
      "update post set description = ? where post_id = ? and user_id = ?";
    return sqlQuery;
  }
  if (!tags && title && description) {
    sqlQuery =
      "update post set title = ?, description = ? where post_id = ? and user_id = ?";
    return sqlQuery;
  }

  if (!description && tags && title) {
    sqlQuery =
      "update post set title = ?, tag = ? where post_id = ? and user_id = ?";
    return sqlQuery;
  }

  if (title && description && tags && postId) {
    sqlQuery =
      "update post set title = ?, description = ?, tag = ? where post_id = ? and  user_id = ?";
    return sqlQuery;
  }
};

const deletePostQueryConstructor = () => {
  var sqlQuery =
    "select a.*, p.* from post as p left join answer as a on p.post_id = a.post_id where p.user_id = ? and p.post_id = ?";
  return sqlQuery;
};

const searchPostQueryConstructor = (userInput: any) => {
  const { title, tags } = userInput;
  var sqlQuery;
  if (!title && !tags) {
    sqlQuery =
      "select post_id, title, description, tag, time from post order by 'timestamp' asc limit ? offset ?";
    return sqlQuery;
  }
  if (!tags) {
    sqlQuery =
      "select post_id, title, description, tag, time from post where title like ? or title like ? or title like ? order by 'timestamp' asc limit ? offset ?";
    return sqlQuery;
  }
  if (!title) {
    sqlQuery =
      "select post_id, title, description, tag, time from post where tag like ? or tag like ? or tag like ? order by 'timestamp' asc limit ? offset ?";
    return sqlQuery;
  }
  if (title && tags) {
    sqlQuery =
      "select post_id, title, description, tag, time from post where title like ? or title like ? or title like ? and tag like ? or tag like ? or tag like ?  order by 'timestamp' asc limit ? offset ?";
    return sqlQuery;
  }
};

const answerQueryConstructor = () => {
  var sqlQuery =
    "insert into answer (answer_id, user_id, post_id, answer) values(?,?,?,?)";
  return sqlQuery;
};

const searchAnswerQueryConstructor = (userInput: any) => {
  const { fields } = userInput;
  const fieldArray = [fields];
  var searchColumn = "select ";
  var sqlQuery;
  if (!fields) {
    sqlQuery =
      "select answer_id, user_id, answer, time from answer where post_id = ? order by time desc";
    return sqlQuery;
  } else {
    for (let i = 0; i < fieldArray.length; i++) {
      if (i === 0) {
        searchColumn = searchColumn + fieldArray[i];
      } else {
        searchColumn = searchColumn + fieldArray[i];
      }
    }

    sqlQuery =
      searchColumn + " from answer where post_id = ? order by time desc";
    return sqlQuery;
  }
};

export {
  loginQuery,
  getUserId,
  createPostQueryConstructor,
  updatePostQueryConstructor,
  deletePostQueryConstructor,
  searchPostQueryConstructor,
  answerQueryConstructor,
  searchAnswerQueryConstructor,
};
