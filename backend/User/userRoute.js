const express = require("express");
const router = express.Router();
const userController = require("./userController");
const email = require("../config/email");
const { sessionValid } = require("../config/session");
// 회원가입
router.post("/signUp", userController.signUp);

// 이메일 인증 코드 보내기
router.post("/email", email.emailValidation);

router.post("/login", sessionValid, userController.login);
router.post("/logout", userController.logout);

module.exports = router;
