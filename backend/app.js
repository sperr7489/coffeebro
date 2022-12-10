var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const connect = require("./schemas/index");
// 소켓 프로그래밍 js 파일
const webSocket = require("./config/socket");

require("dotenv").config({ path: path.join(__dirname, "/config/.env") });

const userRouter = require("./Router/User/userRoute");
const cafeRouter = require("./Router/cafe/cafeRoute");

const chatRouter = require("./Router/Chat/chatRoute");

var app = express();

connect();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/user", userRouter);
app.use("/cafe", cafeRouter);
app.use("/chat", chatRouter);

// app.use("/chat", chatRouter);

const port = 3000;

const server = app.listen(port, () => {
  console.log(`${port} 포트에서 시작`);
});
webSocket(server, app);
