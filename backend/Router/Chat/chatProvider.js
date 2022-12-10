const { basicResponse, resultResponse } = require("../../config/response");
const chatDao = require("./chatDao");
const { pool } = require("../../config/database");
const crypto = require("crypto");
const baseResponseStatus = require("../../config/baseResponseStatus");
const Chat = require("../../schemas/chat");
const userDao = require("../User/userDao");
// 한 유저의 채팅 룸 모두 가져오기
exports.getChatRoom = async (userIdx) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const getChatRoomResult = await chatDao.getChatRoom(connection, userIdx);

    const result = [];
    await Promise.all(
      getChatRoomResult.map(async (v) => {
        const { chatRoomIdx, serviceApplicationIdx } = v;
        // 나 말고 다른 사람의 idx
        const otherIdx =
          userIdx === v.applicantIdx ? v.agentIdx : v.applicantIdx;
        const { userImg, userName, nickname } = await userDao.getUserInfo(
          connection,
          otherIdx
        );

        const chat = await Chat.find({
          $and: [{ chatRoomIdx: chatRoomIdx }, { fromIdx: otherIdx }],
        })
          .sort({ createdAt: -1 })
          .limit(1);

        const oneChatResult = {
          chatRoomIdx,
          serviceApplicationIdx,
          ownUserIdx: userIdx,
          otherIdx,
          otherInfo: {
            userName,
            nickname,
            userImg,
          },
          lastChatOfOther: chat,
        };
        result.push(oneChatResult);
      }) // 상대방이 가장 마지막에 보낸 메시지
    );

    return result;
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
