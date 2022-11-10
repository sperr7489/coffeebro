const { pool } = require("../config/database");
const crypto = require("crypto");
const userDao = require("./userDao");
const { resultResponse, basicResponse } = require("../config/response");
const baseResponseStatus = require("../config/baseResponseStatus");
const { tokenSet } = require("../config/jwt");

// 회원가입
exports.createUser = async (
  email,
  passwd,
  userName,
  department,
  sex,
  studentId
) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    let insertUserParams;
    // Password Hash

    const hashedPassword = await crypto
      .createHash("sha512")
      .update(passwd)
      .digest("base64");
    insertUserParams = [
      email,
      hashedPassword,
      userName,
      department,
      sex,
      studentId,
    ];

    const signUpResult = await userDao.insertUser(connection, insertUserParams);

    await connection.commit();
    return resultResponse(baseResponseStatus.SIGN_UP_SUCCESS, {
      userIdx: signUpResult.insertId,
    });
  } catch (error) {
    await connection.rollback();
    console.log(error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};

//로그인 => refreshToken
exports.logIn = async (email, passwd) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    const hashedPassword = await crypto
      .createHash("sha512")
      .update(passwd)
      .digest("base64");

    const signInCheckPasswd = await userDao.CheckPasswd(connection, email);
    const { userIdx, userName } = await userDao.getUserShortInfo(
      connection,
      email
    );

    if (hashedPassword == signInCheckPasswd.passwd) {
      //로그인에 성공하였을 때 jwt를 발급해주어야 한다.
      const accessToken = tokenSet().access(userIdx);
      const refreshToken = tokenSet().refresh(userIdx);

      const refreshTokenExist = await userDao.refreshTokenExist(
        connection,
        userIdx
      );

      if (refreshTokenExist.exist) {
        //refreshtoken이 존재한다면 이미 로그인한 전적이 있다는 것
        await userDao.updateToken(
          connection,
          userIdx,
          refreshToken,
          accessToken
        );
      } else {
        //refreshToken이 없다는 것은 로그인 내역이 없다는 것.
        await userDao.insertRefreshToken(
          connection,
          userIdx,
          refreshToken,
          accessToken
        );
      }
      await connection.commit();
      return resultResponse(baseResponseStatus.LOGIN_SUCCESS, {
        userIdx,
        userName,
        accessToken,
      });
    } else return basicResponse(baseResponseStatus.PASSWD_NOT_EXACT);
  } catch (error) {
    await connection.rollback();
    console.log(error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};

// AccessToekn 업데이트 하기
exports.updateAccessToken = async (id, accessToken) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    await userDao.updateAccessToken(connection, id, accessToken);
    await connection.commit();
  } catch (error) {
    await connection.rollback();

    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};
