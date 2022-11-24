const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../../config/jwt");
const cafeController = require("./cafeController");

// 카페들에 대해서 가져오기 => 로그인을 안해도 괜찮겠다.
router.get("/", cafeController.getCafeInfo);

// 카페와 카페의 음료수 넣기
router.post("/drink", cafeController.insertCafeDrink);

// 카페에 샷추가와 같은 옵션을 넣기
router.post("/option", cafeController.insertCafeOption);

//카페의 메뉴들 가져오기  + 옵션도 함께 가져오기
router.get("/:cafeIdx/menu", cafeController.getCafeMenu);

module.exports = router;
