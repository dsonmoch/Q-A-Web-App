import { verifyJWT } from "./jwtHandler";
import ErrorHandler from "../errors/apiErrorHandler";
import { Request, Response, NextFunction } from "express";

const authenticateCustomer = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    next(ErrorHandler.authTokenError("No authorization token found"));
  } else {
    const authToken = req.headers.authorization.split(" ")[1];
    if (verifyJWT(authToken)) {
      next();
    } else {
      next(ErrorHandler.authTokenError("Token not doesnot match"));
    }
  }
};

export default authenticateCustomer;
