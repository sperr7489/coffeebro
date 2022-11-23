const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../../config/jwt");
const cafeController = require("./cafeController");

// 카페들에 대해서 가져오기 => 로그인을 안해도 괜찮겠다.
router.get("/", cafeController.getCafeInfo);

// 카페 선택후 해당 카페의 음료수들 가져오기
// router.get("/drinks", cafeController.getCafeDrink);

// 카페와 카페의 음료수 넣기
router.post("/drink", cafeController.insertCafeDrink);

module.exports = router;
