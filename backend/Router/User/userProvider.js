const { basicResponse, resultResponse } = require("../../config/response");
const userDao = require("./userDao");
const { pool } = require("../../config/database");
const crypto = require("crypto");
const baseResponseStatus = require("../../config/baseResponseStatus");

// user의 email의 존재 여부 체크
exports.emailCheck = async (email) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const emailCheckResult = await userDao.emailCheck(connection, email);
    return emailCheckResult;
  } catch (error) {
    console.log(error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};

// user의 존재 여부 체크 이메일 이름 학번
exports.userCheck = async (userName, email, studentId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const userCheckResult = await userDao.userCheck(
      connection,
      userName,
      email,
      studentId
    );
    return userCheckResult;
  } catch (error) {
    console.log(error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};

// RefreshToken 가져오기
exports.getRefreshToken = async (accessToken) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const refreshToken = await userDao.getRefreshToken(connection, accessToken);
    return refreshToken;
  } catch (error) {
    console.log(error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};

// 로그인 => 세션 방식
// exports.logIn = async (email, passwd, session) => {
//   const connection = await pool.getConnection(async (conn) => conn);
//   try {
//     const hashedPassword = await crypto
//       .createHash("sha512")
//       .update(passwd)
//       .digest("base64");

//     const signInCheckPasswd = await userDao.CheckPasswd(connection, email);
//     const { userIdx, userName } = await userDao.getUserShortInfo(
//       connection,
//       email
//     );
//     // 로그인이 성공한 경우
//     if (hashedPassword == signInCheckPasswd.passwd) {
//       session.userIdx = userIdx;
//       session.email = email;
//       session.userName = userName;
//       session.save((err) => {
//         console.log("정상적으로 로그인되지 않았습니다. ");
//         return basicResponse(baseResponseStatus.DB_ERROR);
//       });

//       return resultResponse(
//         baseResponseStatus.LOGIN_SUCCESS,
//         userIdx,
//         userName
//       );
//     } else {
//       return basicResponse(baseResponseStatus.PASSWD_NOT_EXACT);
//     }
//   } catch (error) {
//     await connection.rollback();
//     console.log(error);
//     return basicResponse(baseResponseStatus.DB_ERROR);
//   } finally {
//     connection.release();
//   }
// };
