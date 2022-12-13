import { Md5 } from "ts-md5";

const md5 = new Md5();
const decryptPassword = (userInputPasswd: any) => {
  md5.appendStr(userInputPasswd);
  const password = md5.end();
  return password;
};

export default decryptPassword;
