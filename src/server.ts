import "reflect-metadata";
import dotenv from "dotenv";
import 'express-async-errors';
import { serverHttp } from "./http";
import "./websocket"

dotenv.config()

serverHttp.listen(process.env.PORT, () =>
  console.log(`Server is run in ${process.env.PORT}`));