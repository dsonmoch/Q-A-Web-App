import * as dotenv from "dotenv";
import express from "express";
import errorHandler from "./errors/midwareErrorHandler";
import loginRouter from "./routes/loginRoute";
import postRouter from "./routes/postRoute";
import answerRouter from "./routes/answerRoute";

dotenv.config();
const app = express() ;
const port = process.env.PORT;

console.log(port);

app.use(express.json());

app.get("/", (req, res, next) => res.send("Q&A Forum"));
app.use(loginRouter)
app.use("/post", postRouter);
app.use("/answer", answerRouter);
app.use(errorHandler);

app.listen(port, () => console.log("Server Connected " + port));
