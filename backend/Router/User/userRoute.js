const express = require("express");
const router = express.Router();
const userController = require("./userController");
const email = require("../../config/email");
const { sessionValid } = require("../../config/session");
const { verifyAccessToken } = require("../../config/jwt");
const { upload } = require("../../config/multer");

// 회원가입 => multer을 이용하여 이미지 업로드 추가
router.post(
  "/signUp",
  upload.single("userImg"), //6개까지의 게시물을 등록한다.
  userController.signUp
);

// 이메일 인증 코드 보내기
router.post("/email", email.emailValidation);

// 로그인
router.post("/login", userController.login);

// 배달 서비스 신청 등록하기
router.post("/delivery", verifyAccessToken, userController.delivery);

// 모든 배달 서비스 신청 내역에 대해서 가져오기
router.get("/delivery/infos/all", userController.getDeliveryInfosAll);

// 한 유저의 배달 서비스 신청 정보 모두 가져오기
router.get(
  "/delivery/infos",
  verifyAccessToken,
  userController.getDeliveryInfos
);

// 한 유저의 배달 서비스 신청 정보 한개 가져오기
router.get(
  "/delivery/info/:serviceApplicationIdx",
  userController.getDeliveryInfo
);

// 배달 신청자에게 신청하기
router.post(
  "/delivery/:serviceApplicationIdx",
  verifyAccessToken,
  userController.deliveryApply
);

// 한 유저에게 배달 대행 신청 온 건들에 대한 정보 가져오기
router.get("/apply/infos", verifyAccessToken, userController.getApplyInfos);

// 배달 서비스 신청 수락/거절 하기 => 신청 등록자 입장에서
router.post(
  "/apply/acception/:serviceApplicationIdx",
  verifyAccessToken,
  userController.acception
);

// 유저가 대행하겠다고 신청한 서비스에 대한 모든 정보들 가져오기

/**
 * @todo 해당 로그인 한 유저가 본인이 배달을 대신 해주겠다고 한 것에 대해서 반환값이 어떻게 나올지부터 판단하자.
 */
// 유저 본인이 지원한 배달 대행 내역들 확인
router.get(
  "/apply/delivery/infos",
  verifyAccessToken,
  userController.getApplyDeliveryInfos
);

//마이페이지 정보(이름, 자주 신청하는 카페 3개, 신청자 평점, 배달자 평점) 가져오기
router.get("/mypage", verifyAccessToken, userController.getMyPageInfo);

//닉네임 존재 여부 확인
router.post("/nicknameCheck", userController.nicknameCheck);

module.exports = router;
