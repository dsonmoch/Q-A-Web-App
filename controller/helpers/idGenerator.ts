import crypto from "crypto";
const genereateId = () => {
  const postId = crypto.randomBytes(16).toString("hex");
  return postId;
};

export default genereateId;
