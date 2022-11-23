const cafeProvider = require("./cafeProvider");
const cafeService = require("./cafeService");
const baseResponseStatus = require("../../config/baseResponseStatus");
const { basicResponse, resultResponse } = require("../../config/response");

// 카페의 정보들을 가져오기
exports.getCafeInfo = async (req, res) => {
  const result = await cafeProvider.getCafeInfo();
  return res.send(resultResponse(baseResponseStatus.SUCCESS, result));
};

// 카페와 카페의 음료 넣기
exports.insertCafeDrink = async (req, res) => {
  try {
    const { cafeName, drinkName, price, drinkImage } = req.body;

    // 데이터 검사
    if (!cafeName || !drinkName || !price || !drinkImage) {
      return res.send(basicResponse(baseResponseStatus.BODY_NOT_CORRECT));
    }

    let { cafeIdx } = await cafeProvider.cafeNameIdx(cafeName);
    if (!cafeIdx) {
      const { insertId } = await cafeService.insertCafe(cafeName);
      cafeIdx = insertId;
    }

    const result = await cafeService.insertDrink(
      cafeIdx,
      drinkName,
      price,
      drinkImage
    );

    console.log(result);
    return res.send(result);
  } catch (error) {
    console.error("insertCafeDrink Controller Error");
  }
};
