// 세션을 검증하는 미들웨어
exports.sessionValid = async (req, res, next) => {
  const { session } = req;
  if (session.userIdx) {
    console.log("이미 로그인 되어있습니다.");
  }
  next();
};
