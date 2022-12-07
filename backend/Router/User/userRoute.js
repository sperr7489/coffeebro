const express = require("express");
const router = express.Router();
const userController = require("./userController");
const email = require("../../config/email");
const { sessionValid } = require("../../config/session");
const { verifyAccessToken } = require("../../config/jwt");

// 회원가입
router.post("/signUp", userController.signUp);

// 이메일 인증 코드 보내기
router.post("/email", email.emailValidation);

// 로그인
router.post("/login", userController.login);

// 배달 서비스 신청 등록하기
router.post("/delivery", verifyAccessToken, userController.delivery);

// 배달 서비스 신청 정보 가져오기
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

// 배달 대행 신청에 대해서 정보 가져오기
router.get("/apply/infos", verifyAccessToken, userController.getApplyInfos);

// 배달 서비스 신청 수락/거절 하기 => 신청 등록자 입장에서
router.post(
  "/apply/acception/:serviceApplicationIdx",
  verifyAccessToken,
  userController.acception
);

//마이페이지 정보(이름, 자주 신청하는 카페 3개, 신청자 평점, 배달자 평점) 가져오기
router.get("/mypage",verifyAccessToken,userController.getMyPageInfo);

module.exports = router;
