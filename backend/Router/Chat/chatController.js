const baseResponseStatus = require("../../config/baseResponseStatus");
const { basicResponse, resultResponse } = require("../../config/response");
const chatProvider = require("./chatProvider");
const chatService = require("../Chat/chatService");
const userProvider = require("../User/userProvider");
const regex = require("../../config/regex");
const response = require("../../config/response");
const Room = require("../../schemas/room");

// 유저의 채팅 룸 가져오기
exports.getChatRoom = async (req, res) => {
  const userIdx = req.userIdx;

  const getChatRooms = await chatProvider.getChatRoom(userIdx);
};

// 특정 채팅방에 입장하기
exports.inTheChat = async (req, res) => {
  const fromIdx = req.userIdx; //현재 입장한 사람의 userIdx
  const { chatRoomIdx } = req.params;

  const { userName } = await userProvider.getUserInfo(fromIdx);

  // 해당 채팅방에 user가 누구인지 먼저 검사하기
  const { applicantIdx, agentIdx } = await chatProvider.getChatRoomInfo(
    chatRoomIdx
  );
  /**
   {
     "chatRoomIdx": 32,
     "serviceApplicationIdx": 11,
     "applicantIdx": 35,
     "agentIdx": 32,
     "createdAt": "2022-12-10T14:06:31.000Z"
    }
  */
  const toIdx = fromIdx == applicantIdx ? agentIdx : applicantIdx;
  const userRole = fromIdx == applicantIdx ? "배달 신청자" : "배달 대행자";

  console.log("fromIdx : ", fromIdx);
  console.log("toIdx : ", toIdx);

  const io = req.app.get("io");

  //채팅방에 입장할 때 해당 채팅방에 user의 정보 알려주기
  io.of("/chat")
    .to(chatRoomIdx)
    .emit("join", {
      user: "system",
      message: `${userRole}인 ${userName}의 님이 입장하셨습니다.`,
      userRole,
      userName,
    });

  // 해당 채팅방에서 이야기 된 채팅 기록들 가져오기 => 몽고디비로 시작된다.

  return res.send(baseResponseStatus.SUCCESS);
};
