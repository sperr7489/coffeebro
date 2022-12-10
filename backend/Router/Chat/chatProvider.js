const { basicResponse, resultResponse } = require("../../config/response");
const chatDao = require("./chatDao");
const { pool } = require("../../config/database");
const crypto = require("crypto");
const baseResponseStatus = require("../../config/baseResponseStatus");

exports.getChatRoom = async (userIdx) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const [getChatRoomResult] = await chatDao.getChatRoom(connection, userIdx);
    console.log("getChatRoomResult : ", getChatRoomResult);
    return getChatRoomResult;
  } catch (error) {
    console.log(error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};

// 한 채팅룸에 대한 기본정보 가져오기
exports.getChatRoomInfo = async (chatRoomIdx) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const [getChatRoomInfoResult] = await chatDao.getChatRoomInfo(
      connection,
      chatRoomIdx
    );
    return getChatRoomInfoResult;
  } catch (error) {
    console.log(error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};
