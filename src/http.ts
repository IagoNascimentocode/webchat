import http from "http"
import cors from "cors";
import {Server} from "socket.io"
import path from "path";
import express from "express";

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname,"..","public")));

const serverHttp = http.createServer(app)

const io = new Server(serverHttp)

export { serverHttp, io }

