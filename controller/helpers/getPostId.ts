import queryExecuter from "../../utilities/db-config";
const getPostId = async (userInput: any) => {
  const { questionTitle } = userInput;
  const sqlQuery = "select post_id from post where title = ?";
  const params = [questionTitle];
  const result: any = await queryExecuter(sqlQuery, params);
  if (result.length > 0) {
    return result[0].post_id;
  } else {
    return result;
  }
};

export default getPostId;
