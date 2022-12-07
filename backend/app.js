var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

require("dotenv").config({ path: path.join(__dirname, "/config/.env") });

const userRouter = require("./Router/User/userRoute");
const cafeRouter = require("./Router/cafe/cafeRoute");

const chatRouter = require("./Router/Chat/chatRoute");

var app = express();
const http = require("http").createServer(app);
// const redisAdapter = require("socket.io-redis");

// io.adapter(redisAdapter({ host: "localhost", port: 6379 }));

// const io = require("socket.io")(3000);
// const io = require("socket.io")(http, { cors: { origin: "*" } });

require("./config/socket")(http);

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

http.listen(port, () => {
  console.log(`${port} 포트에서 시작`);
});
