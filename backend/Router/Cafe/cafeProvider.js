const cafeDao = require("./cafeDao");
const { basicResponse, resultResponse } = require("../../config/response");
const { pool } = require("../../config/database");

// 카페 정보 가져오기
exports.getCafeInfo = async () => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const cafeInfos = await cafeDao.getCafeInfos(connection);
    console.log("cafeInfos : ", cafeInfos);
    return cafeInfos;
  } catch (error) {
    console.log(error, " : getCafeInfos");
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};
// 카페 정보 가져오기
exports.cafeNameIdx = async (cafeName) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const cafeNameIdx = await cafeDao.getCafeIdx(connection, cafeName);
    return cafeNameIdx;
  } catch (error) {
    console.log("cafeNameExist Provider Error ", error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};
