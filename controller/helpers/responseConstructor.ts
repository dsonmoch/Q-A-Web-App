import responseCompresser from "../../utilities/responseCompressor";
import { generateJWT } from "../../authentication/jwtHandler";

interface Result {
  sucess: boolean;
  message: any;
  token: any;
  data: any;
}

const responseConstructor = (result: any, message: any, token: boolean) => {
  if (token) {
    const token = generateJWT(result[0].email);
    const response: any = {
      sucess: true,
      message: message,
      token: token,
      data: result[0],
    };
    responseCompresser(response);
    return response;
  }
  const response: any = {
    sucess: true,
    message: message,
    data: result,
  };
  responseCompresser(response);
  return response;
};

export default responseConstructor;
