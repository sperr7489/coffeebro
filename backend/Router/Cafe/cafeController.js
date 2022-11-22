const cafeProvider = require("./cafeProvider");
const baseResponseStatus = require("../../config/baseResponseStatus");
const { basicResponse, resultResponse } = require("../../config/response");

// 카페의 정보들을 가져오기
exports.getCafeInfo = async (req, res) => {
  const result = await cafeProvider.getCafeInfo();
  res.send(resultResponse(baseResponseStatus.SUCCESS, result));
};
