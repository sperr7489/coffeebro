const jwt = require("jsonwebtoken");
const { basicResponse } = require("../config/response");
const baseResponseStatus = require("../config/baseResponseStatus");
require("dotenv").config();
// const JWT_SECRET = process.env.JWT_SECRET;
// require("dotenv").config();
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const userProvider = require("../User/userProvider");
const userService = require("../User/userService");

//토큰을 발급하는 함수에 대한 셋

exports.tokenSet = () => {
  return {
    // access 토큰을 만드는 함수.
    access(id) {
      return jwt.sign({ id }, ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
    },
    // refresh 토큰을 만드는 함수
    refresh(id) {
      return jwt.sign({ id }, REFRESH_TOKEN_SECRET, {
        expiresIn: "30d",
      });
    },
  };
};

// 토큰을 인증하는 것은
exports.verifyAccessToken = async (req, res, next) => {
  const accessToken = req.headers["accesstoken"];
  try {
    // 클라이언트에서 토큰을 받아온다.
    if (!accessToken) {
      return res.send(basicResponse(baseResponseStatus.TOKEN_NOT_EXIST));
    }
    const access = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

    if (access) {
      req.userIdx = access.id;
      next();
    }
  } catch (error) {
    //accessToken이 만료된 경우
    if (error.name === "TokenExpiredError") {
      const { refreshToken } = await userProvider.getRefreshToken(accessToken);
      try {
        const { id } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        if (id) {
          const accessToken = jwt.sign({ id }, ACCESS_TOKEN_SECRET, {
            expiresIn: "1d",
          });
          req.accessTokenNew = accessToken; //res에다가 넣어주도록 한다.
          req.userIdx = id;
          // const accessToken = this.token().refresh(id);
          await userService.updateAccessToken(id, accessToken);
          return next();
        }
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          return res.send(basicResponse(baseResponseStatus.TOKEN_EXPIRED));
        }
        return res.send(basicResponse(baseResponseStatus.TOKEN_NOT_VALID));
      }

      return res.send(basicResponse(baseResponseStatus.TOKEN_EXPIRED));
    }

    return res.send(basicResponse(baseResponseStatus.TOKEN_NOT_VALID));
  }
};
// exports.verifyRefreshToken = (req, res, next) => {
//   try {
//     const refreshToken = req.header["refreshtoken"];
//     if (!refreshToken)
//       return res.send(basicResponse(baseResponseStatus.TOKEN_NOT_EXIST));
//     const access = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
//   } catch (error) {}
// };
// exports.jwtMiddleWare = (req, res, next) => {};
