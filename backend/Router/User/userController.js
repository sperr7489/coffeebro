const baseResponseStatus = require("../../config/baseResponseStatus");
const { basicResponse, resultResponse } = require("../../config/response");
const userService = require("./userService");
const userProvider = require("./userProvider");
const regex = require("../../config/regex");
const response = require("../../config/response");

//회원가입
exports.signUp = async (req, res) => {
  const { email, passwd, userName, department, sex, studentId } = req.body;

  // 어느하나라도 제대로 입력되지 않았을 때
  if (!email || !passwd || !userName || !department || !sex || !studentId)
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
    studentId
  );
  return res.send(basicResponse(baseResponseStatus.SIGN_UP_SUCCESS));
};

//로그인
exports.login = async (req, res) => {
  const { email, passwd } = req.body;
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
  const userIdx = req.userIdx;
};
