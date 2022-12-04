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
router.get("/deliver/info", verifyAccessToken, userController.getDeliveryInfo);

// 배달 신청자에게 신청하기
// router.post()

// 배달 대행 지원
router.post("/deliver/apply", verifyAccessToken);

// 배달 서비스 신청 내역 조회
router.get("/service");

module.exports = router;
