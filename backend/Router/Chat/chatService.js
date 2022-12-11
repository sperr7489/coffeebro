const crypto = require("crypto");
const { resultResponse, basicResponse } = require("../../config/response");
const baseResponseStatus = require("../../config/baseResponseStatus");
const { tokenSet } = require("../../config/jwt");
const { pool } = require("../../config/database");
const chatDao = require("../Chat/chatDao");

exports.updateChatRoomStatus = async (chatRoomIdx) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await chatDao.updateChatRoomStatus(connection, chatRoomIdx);
  } catch (error) {
    await connection.rollback();

    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};
