import * as express from "express";
import signin from "../controller/loginController";
import { loginInputValidator } from "../validation/inputValidation";

let loginRouter = express.Router()
loginRouter.post("/signin", loginInputValidator, signin);

export default  loginRouter;
