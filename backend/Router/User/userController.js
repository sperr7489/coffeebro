const baseResponseStatus = require("../../config/baseResponseStatus");
const { basicResponse, resultResponse } = require("../../config/response");
const userService = require("./userService");
const userProvider = require("./userProvider");
const chatService = require("../Chat/chatService");
const regex = require("../../config/regex");
const response = require("../../config/response");
const Room = require("../../schemas/room");

//회원가입
exports.signUp = async (req, res) => {
  const { email, passwd, userName, department, sex, studentId, nickname } =
    req.body;
  const userImg = req.file;
  // 어느하나라도 제대로 입력되지 않았을 때
  if (
    !email ||
    !passwd ||
    !userName ||
    !department ||
    !sex ||
    !studentId ||
    !nickname
  )
    return res.send(basicResponse(baseResponseStatus.PARAMS_NOT_EXACT));
  const emailCheck = await userProvider.emailCheck(email);
  if (emailCheck) {
    return res.send(basicResponse(baseResponseStatus.EMAIL_EXISTS));
  }
  //최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 :
  const passwdCheck = regex.passwd(passwd);
  if (!passwdCheck)
    return res.send(basicResponse(baseResponseStatus.PASSWORD_INVALID));

  await userService.createUser(
    email,
    passwd,
    userName,
    department,
    sex,
    studentId,
    nickname,
    userImg
  );
  return res.send(basicResponse(baseResponseStatus.SIGN_UP_SUCCESS));
};

//로그인
exports.login = async (req, res) => {
  let { email, passwd } = req.body;
  const { session } = req;

  if (!email || !passwd)
    return res.send(basicResponse(baseResponseStatus.PARAMS_NOT_EXACT));

  //이메일을 입력할수도 아이디를 입력할 수도 있다.
  if (!email.includes("ajou.ac.kr")) {
    email += "@ajou.ac.kr";
  }

  const emailValid = regex.email(email);
  // 이메일의 형식이 틀렸을 경우에

  if (!emailValid) {
    return res.send(basicResponse(baseResponseStatus.EMAIL_INVALID));
  }
  const emailCheck = await userProvider.emailCheck(email);
  // 해당 이메일이 존재하지 않을 때
  if (!emailCheck)
    return res.send(basicResponse(baseResponseStatus.EMAIL_NOT_EXIST));

  //이메일과 패스워드가 제대로 되었다면 이를 제대로 되었는지 비교해 봐야겠지?
  const signInResult = await userService.logIn(email, passwd, session);

  return res.send(signInResult);
};

// //로그아웃
// exports.logout = async (req, res) => {

//   if (req.session) {
//     req.session.destroy(() => {
//       return res.redirect("/").send(basicResponse(baseResponseStatus.SUCCESS));
//     });
//   }
//   return res.send(basicResponse(baseResponseStatus.NOT_LOGINED));
// };

// 배달 대행 서비스 신청
exports.delivery = async (req, res) => {
  const userIdx = req.userIdx; // 배달 대행 서비스를 신청한 사람의 userIdx

  //drinkInfos는 drinkIdx와 optionIdx를 말한다.
  const { cafeIdx, receiptTime, receiptPlace, drinkInfos } = req.body;

  /**
   * drinkInfos의 예
   * [
   *  {
   *    drinkIdx :1,
   *    optionList : [1,2,3]
   *  }
   *  {
   *    drinkIdx :2,
   *    optionList : [1,2,3]
   *  }
   * ]
   *
   */

  if (!cafeIdx || !receiptTime || !receiptPlace || !drinkInfos)
    return res.send(basicResponse(baseResponseStatus.PARAMS_NOT_EXACT));

  const deliveryResult = await userService.delivery(
    userIdx,
    cafeIdx,
    receiptTime,
    receiptPlace,
    drinkInfos
  );

  return res.send(deliveryResult);
};

// 모든 배달 서비스 신청 내역에 대해서 가져오기
exports.getDeliveryInfosAll = async (req, res) => {
  const getServiceApplicationIdxList =
    await userProvider.getServiceApplicationIdxList();
  const result = [];
  await Promise.all(
    getServiceApplicationIdxList.map(async (v) => {
      const { serviceApplicationIdx } = v;
      const getDeliveryInfo = await userProvider.getDeliveryInfo(
        serviceApplicationIdx
      );
      const { userIdx } = getDeliveryInfo;
      const userInfo = await userProvider.getUserInfo(userIdx);
      delete userInfo.deliveryAgentScore;
      getDeliveryInfo["userInfo"] = userInfo;
      result.push(getDeliveryInfo);
    })
  );

  return res.send(resultResponse(baseResponseStatus.SUCCESS, result));
};
// 한 유저의 배달 서비스 신청 정보 모두 가져오기
exports.getDeliveryInfos = async (req, res) => {
  const userIdx = req.userIdx;

  const getDeliveryInfosResult = await userProvider.getDeliveryInfos(userIdx);

  return res.send(
    resultResponse(baseResponseStatus.SUCCESS, getDeliveryInfosResult)
  );
};

// 배달 신청자의 신청 내용 하나 가져오기
exports.getDeliveryInfo = async (req, res) => {
  const { serviceApplicationIdx } = req.params;

  const getDeliveryInfoResult = await userProvider.getDeliveryInfo(
    serviceApplicationIdx
  );

  return res.send(
    resultResponse(baseResponseStatus.SUCCESS, getDeliveryInfoResult)
  );
};

// 배달 신청자에게 신청하기
exports.deliveryApply = async (req, res) => {
  const { serviceApplicationIdx } = req.params;
  const userIdx = req.userIdx; // 배달 대행을 지원하는 사람

  // 배달 대행을 해주는 사람과 배달 대행을 신청한 사람은 동일인물일 수 없다. 배달 서비스를 이용하는 사람
  const getDeliveryInfoResult = await userProvider.getDeliveryInfo(
    serviceApplicationIdx
  );
  const { userIdx: receiverIdx } = getDeliveryInfoResult;

  if (userIdx == receiverIdx) {
    return res.send(basicResponse(baseResponseStatus.IMPOSSIBLE_SAME_USER));
  }

  const deliveryApplyResult = await userService.deliveryApply(
    userIdx,
    serviceApplicationIdx
  );
  return res.send(deliveryApplyResult);
};

// 한 유저에게 배달 대행 신청에 대해서 정보 가져오기
exports.getApplyInfos = async (req, res) => {
  const userIdx = req.userIdx; // userIdx 자체가 배달 서비스를 신청한 사람의 index가 된다.

  // 배달 대행을 하겠다고 신청한사람들에 인덱스 가져오기
  const getApplyInfos = await userProvider.getApplyInfos(userIdx);

  return res.send(resultResponse(baseResponseStatus.SUCCESS, getApplyInfos));
};

// 배달 서비스 신청 수락/거절 하기 => 신청 등록자 입장에서
// 수락 시 채팅방이 생성되어야 한다.
exports.acception = async (req, res) => {
  const userIdx = req.userIdx; // 서비스 신청자.
  const { serviceApplicationIdx } = req.params;
  const { acceptFlag, deliveryAgentIdx: agentIdx } = req.query;

  console.log("acceptFlag : ", acceptFlag);
  const acceptionResult = await userService.acception(
    //mysql에 저장된 chatRoomIdx
    userIdx,
    serviceApplicationIdx,
    acceptFlag,
    agentIdx
  );

  const { userName: applicantName } = await userProvider.getUserInfo(userIdx);
  const { userName: agentName } = await userProvider.getUserInfo(agentIdx);

  if (acceptionResult != -1) {
    // 수락되어 채팅 내역을 만들어야 한다는 뜻.
    // const newRoom = await Room.create({
    //   roomIdx: chatRoomIdx,
    //   applicant: {
    //     userIdx: userIdx,
    //     userName: applicantName,
    //   },
    //   agent: {
    //     userIdx: agentIdx,
    //     userName: agentName,
    //   },
    // });
    // const io = req.app.get("io"); // io를 통해서 소켓 통신 연결 유지.
    // // 방을 새로 만들었다는 이벤트를 발생시킨다.
    // io.of("/room").emit("createRoom", newRoom);
  }

  return res.send(basicResponse(baseResponseStatus.SUCCESS));
};

// 유저 본인이 지원한 배달 대행 내역들 확인
exports.getApplyDeliveryInfos = async (req, res) => {
  const userIdx = req.userIdx; // 자신이 대행자인경우

  const getApplyDeliveryInfosResult = await userProvider.getApplyDeliveryInfos(
    userIdx
  );

  return res.send(
    resultResponse(baseResponseStatus.SUCCESS, getApplyDeliveryInfosResult)
  );
};

// 마이페이지 정보(유저 이름, 많이 신청한 카페 이름 top3, 신청자 평점, 대행자 평점
exports.getMyPageInfo = async (req, res) => {
  const userIdx = req.userIdx;

  const userInfo = await userProvider.getUserInfo(userIdx);
  const mostVisitedCafeNames = await userProvider.getMostVisitedCafeNames(
    userIdx
  );

  let myPageInfo = { ...userInfo };
  myPageInfo.mostVisitedCafeNames = mostVisitedCafeNames;

  return res.send(resultResponse(baseResponseStatus.SUCCESS, myPageInfo));
};

//닉네임 사용 가능 여부 확인
exports.nicknameCheck = async (req, res) => {
  const { nickname } = req.body;

  const nicknameCheckResult = await userProvider.nicknameCheck(nickname);
  if (nicknameCheckResult) {
    return res.send(basicResponse(baseResponseStatus.NICKNAME_EXISTS));
  }

  //닉네임은 2자 이상 8자 이하, 영어 또는 숫자 또는 한글
  const nicknameCheck = regex.nickname(nickname);
  if (!nicknameCheck)
    return res.send(basicResponse(baseResponseStatus.NICKNAME_INVALID));

  return res.send(basicResponse(baseResponseStatus.NICKNAME_CONFIRM_SUCCESS));
};

// 마이페이지 정보(사진, 닉네임) 수정
exports.updateUserInfo = async (req, res) => {
  const userIdx = req.userIdx;
  const { nickname, userImg } = req.body;

  if (!nickname || !userImg)
    return res.send(basicResponse(baseResponseStatus.PARAMS_NOT_EXACT));

  const updateUserInfoResult = await userService.updateUserInfo(
    userIdx,
    nickname,
    userImg
  );

  return res.send(updateUserInfoResult);
};

// 배달 대행 완료 및 알림 생성
exports.completeDelivery = async (req, res) => {
  const userIdx = req.userIdx;
  const { deliveryApplicationIdx } = req.params;

  const completeDeliveryResult =
    await userService.updateServiceApplicationStatus(
      userIdx,
      deliveryApplicationIdx
    );

  return res.send(completeDeliveryResult);
};

// 유저의 모든 아직 읽지 않은 알림 정보 가져오기
exports.getNotificationAll = async (req, res) => {
  const userIdx = req.userIdx;

  const getNotificationsResult = await userProvider.getNotifications(userIdx);
  return res.send(
    resultResponse(baseResponseStatus.SUCCESS, getNotificationsResult)
  );
};

// 알림 읽음 처리
exports.updateNotification = async (req, res) => {
  const { notificationIdx } = req.params;

  const updateNotificationResult = await userService.updateNotification(
    notificationIdx
  );
  return res.send(updateNotificationResult);
};

// 서비스 신청자에 대한 평점 부여
exports.updateApplicantScore = async (req, res) => {
  const { applicantIdx, score } = req.body;

  const updateApplicantScoreResult = await userService.updateApplicantScore(
    applicantIdx,
    score
  );
  return res.send(updateApplicantScoreResult);
};

// 배달 대행자에 대한 평점 부여
exports.updateDeliveryAgentScore = async (req, res) => {
  const { deliveryAgentIdx, score } = req.body;

  const updateDeliveryAgentScoreResult =
    await userService.updateDeliveryAgentScore(deliveryAgentIdx, score);
  return res.send(updateDeliveryAgentScoreResult);
};
