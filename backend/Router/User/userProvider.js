const userDao = require("./userDao");
const { basicResponse, resultResponse } = require("../../config/response");
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

    let drinkInfos = [];
    await Promise.all(
      getDeliveryInfoResult.map(async (v, i) => {
        const optionIdxList = v.optionList.split(",");
        let drinkInfo = {};
        drinkInfo["name"] = v.drinkName;
        // console.log("optionIdxList :", optionIdxList);
        const optionNames = await cafeDao.getOptionList(
          connection,
          optionIdxList
        );
        const optionNameList = optionNames.map((v) => v.optionName);
        // console.log("optionNameList : ", optionNameList);

        drinkInfo["option"] = optionNameList;
        drinkInfos.push(drinkInfo);

        // v.optionList = optionNameList;
      })
    );

    var retMap = drinkInfos.reduce((prev, cur) => {
      const str = JSON.stringify(cur);

      prev[str] = (prev[str] || 0) + 1;
      return prev;
    }, {});

    const toArr = Object.entries(retMap);

    const resultArr = toArr.map((v, i) => {
      const temp = JSON.parse(v[0]);
      temp["num"] = v[1];
      return temp;
    });

    const result = { ...getDeliveryInfoResult[0], resultArr };

    delete result.drink;
    delete result.optionList;
    delete result.drinkName;

    return result;
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

/** 유저가 대행하겠다고 신청한 서비스에 대한 정보들 가져오기 */
exports.getApplyDeleveryInfos = async (userIdx) => {
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

// 유저의 이름, 닉네임, 신청자 평점, 대행자 평점, 사진 가져오기
exports.getUserInfo = async (userIdx) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const userInfoResult = await userDao.getUserInfo(connection, userIdx);
    return userInfoResult;
  } catch (error) {
    console.log(error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};

// user가 자주 신청한 카페의 이름 top3 받아오기
exports.getMostVisitedCafeNames = async (userIdx) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const mostVisitedCafeIdxResult = await userDao.getMostVisitedCafeIdx(
      connection,
      userIdx
    );

    let mostVisitedCafeNames = {};
    for (let i = 0; i < 3; i++) {
      let mostVisitedCafeNameResult = null;
      if (i < mostVisitedCafeIdxResult.length) {
        mostVisitedCafeNameResult = await cafeDao.getCafeName(
          connection,
          mostVisitedCafeIdxResult[i].cafeIdx
        );
      }
      mostVisitedCafeNames["mostVisitedCafeName" + (i + 1).toString()] =
        mostVisitedCafeNameResult ? mostVisitedCafeNameResult.cafeName : "없음";
    }

    return mostVisitedCafeNames;
  } catch (error) {
    console.log(error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};

// user의 닉네임의 존재 여부 체크
exports.nicknameCheck = async (nickname) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const nicknameCheckResult = await userDao.nicknameCheck(connection, nickname);
    return nicknameCheckResult;
  } catch (error) {
    console.log(error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};