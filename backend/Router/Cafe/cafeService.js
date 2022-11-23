const crypto = require("crypto");
const { resultResponse, basicResponse } = require("../../config/response");
const baseResponseStatus = require("../../config/baseResponseStatus");
const { pool } = require("../../config/database");
const cafeDao = require("./cafeDao");

//카페 넣기
exports.insertCafe = async (cafeName) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const insertCafeResult = await cafeDao.insertCafe(connection, cafeName);
    await connection.commit();
    return insertCafeResult;
  } catch (error) {
    await connection.rollback();
    console.error("insertCafe Service Error");
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};

// 해당 카페에 대해서 음료 넣기
exports.insertDrink = async (cafeIdx, drinkName, price, drinkImage) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const insertDrinkResult = await cafeDao.insertDrink(
      connection,
      cafeIdx,
      drinkName,
      price,
      drinkImage
    );

    const drinkInfo = { cafeIdx, drinkName, price, drinkImage };
    await connection.commit();
    return resultResponse(baseResponseStatus.SUCCESS, drinkInfo);
  } catch (error) {
    await connection.rollback();
    console.error("insertDrink Service Error", error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};

// 카페의 옵션을 넣기
exports.insertCafeOption = async (cafeIdx, optionName, price) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const insertCafeOption = await cafeDao.insertOption(
      connection,
      cafeIdx,
      optionName,
      price
    );

    const optionInfo = { cafeIdx, optionName, price };
    await connection.commit();
    return resultResponse(baseResponseStatus.SUCCESS, optionInfo);
  } catch (error) {
    await connection.rollback();
    console.error("insertCafeOption Service Error", error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};
