const baseResponseStatus = require("../../config/baseResponseStatus");
const { basicResponse, resultResponse } = require("../../config/response");
const chatProvider = require("./chatProvider");
const chatService = require("../Chat/chatService");
const userService = require("../user/userService");
const userProvider = require("../User/userProvider");
const regex = require("../../config/regex");
const response = require("../../config/response");
const Room = require("../../schemas/room");
const Chat = require("../../schemas/chat");

// 유저의 채팅 룸 가져오기
exports.getChatRoom = async (req, res) => {
  const userIdx = req.userIdx;

  const getChatRooms = await chatProvider.getChatRoom(userIdx);
  return res.send(resultResponse(baseResponseStatus.SUCCESS, getChatRooms));
};

// 특정 채팅방에 입장하기
exports.inTheChat = async (req, res) => {
  const userIdx = req.userIdx; //현재 입장한 사람의 userIdx
  const { chatRoomIdx } = req.params;

  const chatRoomIdxExist = await chatProvider.chatRoomIdxExist(chatRoomIdx);

  if (chatRoomIdxExist == 0) {
    return res.send(basicResponse(baseResponseStatus.CHATROOM_NOT_EXIST));
  }

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
  // const toIdx = userIdx == applicantIdx ? applicantIdx : agentIdx;

  const { userName: applicantName } = await userProvider.getUserInfo(
    applicantIdx
  );
  const { userName: agentName } = await userProvider.getUserInfo(agentIdx);

  const io = req.app.get("io");

  const userName = userIdx == applicantIdx ? applicantName : agentName;
  const userRole = userIdx == applicantIdx ? "배달 신청자" : "배달 대행자";

  //채팅방에 입장할 때 해당 채팅방에 user의 정보 알려주기
  // 클라이언트 상에서 해당 채팅 화면으로 이동할 때 이 API가 불릴텐데 그 과정에서 이 join이벤트를 listening하면 된다.
  io.of("/chat")
    .to(chatRoomIdx)
    .emit("join", {
      user: "system",
      message: `${userRole}인 ${userName}님이 입장하셨습니다.`,
      userRole,
      userName,
    });
  const result = {};
  result["chatRoomIdx"] = chatRoomIdx;
  result["applicant"] = applicantName;
  result["agent"] = agentName;
  // 해당 채팅방에서 이야기 된 채팅 기록들 가져오기 => 몽고디비로 시작된다.
  const chats = await Chat.find({ chatRoomIdx: chatRoomIdx }).sort("createdAt");
  result["chats"] = chats;
  return res.send(resultResponse(baseResponseStatus.SUCCESS, result));
};

// 채팅하기
exports.chatting = async (req, res) => {
  const userIdx = req.userIdx;
  const { chatRoomIdx } = req.params;
  const { applicantIdx, agentIdx } = await chatProvider.getChatRoomInfo(
    chatRoomIdx
  );

  // 사진 자료는 잠시!
  const { message } = req.body;

  // 나 말고 다른 사람의 idx
  const otherIdx = userIdx === applicantIdx ? agentIdx : applicantIdx;

  const chat = await Chat.create({
    chatRoomIdx: chatRoomIdx,
    fromIdx: userIdx,
    toIdx: otherIdx,
    message: message,
  });

  const io = req.app.get("io");

  io.of("/chat").to(chatRoomIdx).emit("chat", chat);

  res.send(basicResponse(baseResponseStatus.SUCCESS));
};

// 배달 완료 보내기
exports.completeDelivery = async (req, res) => {
  const userIdx = req.userIdx;
  const { chatRoomIdx } = req.params;
  const { applicantIdx, agentIdx } = await chatProvider.getChatRoomInfo(
    chatRoomIdx
  );
  if (userIdx != agentIdx) {
    return res.send(basicResponse(baseResponseStatus.USER_NOT_AGENT));
  }
  // 배달 완료가 눌리게 되면

  const io = req.app.get("io");
  io.of("/chat").to(chatRoomIdx).emit("complete", {
    user: "system",
    message: "배달 대행자가 배달 대행을 완료 했습니다. 평점을 남겨주세요",
  });
  return res.send(basicResponse(baseResponseStatus.PLEASE_CHECK_SERVERCODE));
};

// 평점을 메기고 chatting방의 status가 1로 바뀐다. => 거래가 완료되었다는 뜻.
exports.scoreAgent = async (req, res) => {
  const userIdx = req.userIdx;
  const { chatRoomIdx } = req.params;
  const { applicantIdx, agentIdx } = await chatProvider.getChatRoomInfo(
    chatRoomIdx
  );
  const { score } = req.body;

  if (userIdx != applicantIdx) {
    return res.send(basicResponse(baseResponseStatus.USER_NOT_APPLICANT));
  }
  // 배달 대행자에 대한 평점 넣기
  if (score) {
    // 점수로 들어온게 있다면!
    await userService.updateAgentScore(agentIdx);
  }
  // 채팅룸의 status를 바꾼다.
  await chatService.updateChatRoomStatus(chatRoomIdx);

  return res.send(basicResponse(baseResponseStatus.SUCCESS));
};
