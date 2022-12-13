import * as dotenv from "dotenv";

import * as jwt from "jsonwebtoken";

dotenv.config();

const privateKey: any = process.env.PRIVATE_KEY;
var token;

const generateJWT = (email: string) => {
  token = jwt.sign({ email: email }, privateKey, { expiresIn: 6000 });
  return token;
};

const verifyJWT = (userToken: string) => {
  const result: any = jwt.verify(userToken, privateKey, (error: any , result: any) => {
    if (error) return false;
    return true;
  });
  if (result) return true;
  return false;
};

export { generateJWT, verifyJWT };
