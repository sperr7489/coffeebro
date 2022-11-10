var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

require("dotenv").config({ path: path.join(__dirname, "/config/.env") });

const session = require("express-session");
const { pool } = require("./config/database");

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

var userRouter = require("./User/userRoute");

var app = express();

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

app.listen(3000, () => {
  console.log("3000번 포트에서 시작");
});

module.exports = app;
