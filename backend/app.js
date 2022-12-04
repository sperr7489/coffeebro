var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

require("dotenv").config({ path: path.join(__dirname, "/config/.env") });

// const session = require("express-session");
// const { pool } = require("./config/database");

// // const mysqlStore = require("express-mysql-session")(session);
// // const sessionStore = new mysqlStore(
// //   {
// //     // expiration: 1000 * 60 * 24 * 2, // 2일의 만료기간
// //     expiration: 10000, // 10초
// //     checkExpirationInterval: 1000 * 60 * 24, //하루마다 만료된 세션을 디비에서 삭제시킨다.
// //   },
// //   pool
// // );

// const { SESSION_KEY, SESSION_SECRET } = process.env;

const userRouter = require("./Router/User/userRoute");
const cafeRouter = require("./Router/cafe/cafeRoute");
// const chatRouter = require("./Router/chat/chatRouter");

var app = express();
const http = require("http").createServer(app);
// const redisAdapter = require("socket.io-redis");

// io.adapter(redisAdapter({ host: "localhost", port: 6379 }));

// const io = require('socket.io')(3000);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const redisAdapter = require("socket.io-redis");
io.adapter(redisAdapter({ host: "localhost", port: 6379 }));
io.of("/").adapter.on("error", function (msg) {
  console.log("msg : ", msg);
});
// const test = require("./config/socket");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// 세션을 사용하는 코드. req에서 session에 대한 정보를 확인할 수 있다.
// app.use(
//   session({
//     key: SESSION_KEY,
//     secret: SESSION_SECRET,
//     store: sessionStore,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 100000,
//     },
//   })
// );

app.use("/user", userRouter);
app.use("/cafe", cafeRouter);

const port = 3000;

http.listen(port, () => {
  console.log(`${port} 포트에서 시작`);
});

// module.exports = app;
app.get("/"); //Todo => 소켓 라우팅 개발하기

require("./config/socket")(io);
// io.on("connection", (socket) => {
//   console.log("test");
//   socket.on("chat message", (msg) => {
//     io.emit("chat message", msg);
//   });
// });

// io.on("connection", chatRouter);
/**
 * chatRoute이든 config에서 어떤 것을 만들든.
 * 이 곳에서 이제 위에 나와있는 socket key값을 가져올 수 있도록 한다.
 *
 */
