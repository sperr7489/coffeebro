const { basicResponse, resultResponse } = require("../../config/response");
const userDao = require("./userDao");
const cafeDao = require("../Cafe/cafeDao");
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

exports.getDeliveryInfos = async (userIdx) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const getDeliveryInfosResult = await userDao.getDeliveryInfos(
      connection,
      userIdx
    );

    return getDeliveryInfosResult;
  } catch (error) {
    console.log(error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};

// 배달 대행 서비스 신청한 사람의 정보 가져오기.
exports.getDeliveryInfo = async (serviceApplicationIdx) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const getDeliveryInfoResult = await userDao.getDeliveryInfo(
      connection,
      serviceApplicationIdx
    );
    console.log("getDeliveryInfoResult :", getDeliveryInfoResult);
    await Promise.all(
      getDeliveryInfoResult.map(async (v, i) => {
        const optionIdxList = v.optionList.split(",");
        console.log("optionIdxList :", optionIdxList);
        const optionNames = await cafeDao.getOptionList(
          connection,
          optionIdxList
        );
        const optionNameList = optionNames.map((v) => v.optionName);
        console.log("optionNameList : ", optionNameList);

        v.optionList = optionNameList;
      })
    );

    return getDeliveryInfoResult;
  } catch (error) {
    console.log(error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};

// 배달 대행을 하겠다고 신청한 내역 가져오기
exports.getApplyInfos = async (userIdx) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const getApplyInfosResult = await userDao.getApplyInfos(
      connection,
      userIdx
    );
    return getApplyInfosResult;
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
