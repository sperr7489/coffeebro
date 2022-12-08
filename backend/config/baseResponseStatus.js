module.exports = {
  //성공
  SUCCESS: { isSuccess: true, code: 1000, message: "성공" }, //조회
  SIGN_UP_SUCCESS: {
    isSuccess: true,
    code: 1100,
    message: "회원가입에 성공하였습니다.",
  },
  EMAIL_CONFIRM_SUCCESS: {
    isSuccess: true,
    code: 1101,
    message: "사용가능한 이메일입니다.",
  },
  NICKNAME_CONFIRM_SUCCESS: {
    isSuccess: true,
    code: 1102,
    message: "사용가능한 닉네임입니다.",
  },
  SIGN_IN_SUCCESS: {
    isSuccess: true,
    code: 1103,
    message: "로그인에 성공하였습니다.",
  },
  NEED_SIGN_UP: {
    isSuccess: true,
    code: 1104,
    message: "회원가입이 필요한 계정입니다.",
  },
  FIND_PASSWORD_SUCCESS: {
    isSuccess: true,
    code: 1105,
    message: "해당 핸드폰 번호로 임시 비밀번호를 발송하였습니다.",
  },
  PASSWORD_CORRESPOND_SUCCESS: {
    isSuccess: true,
    code: 1106,
    message: "비밀번호가 일치합니다.",
  },
  PASSWORD_UPDATE_SUCCESS: {
    isSuccess: true,
    code: 1107,
    message: "비밀번호가 변경되었습니다.",
  },
  NICKNAME_UPDATE_SUCCESS: {
    isSuccess: true,
    code: 1108,
    message: "닉네임이 변경되었습니다.",
  },
  USER_INFO_UPDATE_SUCCESS: {
    isSuccess: true,
    code: 1109,
    message: "회원정보가 변경되었습니다.",
  },
  USER_DROP_SUCCESS: {
    isSuccess: true,
    code: 1110,
    message: "회원탈퇴에 성공하였습니다.",
  },
  VERIFICATION_SUCCESS: {
    isSuccess: true,
    code: 1111,
    message: "토큰 검증에 성공하였습니다.",
  },
  LOGIN_SUCCESS: {
    isSuccess: true,
    code: 1112,
    message: "로그인에 성공하였습니다.",
  },
  //실패
  PARAMS_NOT_EXACT: {
    isSuccess: false,
    code: 3000,
    message: "정확하지 않은 인자가 존재합니다. ",
  },
  TOKEN_EXPIRED: {
    isSuccess: false,
    code: 2000,
    message: "토큰이 만료되었습니다. ",
  },
  TOKEN_NOT_VALID: {
    isSuccess: false,
    code: 2001,
    message: " 유효하지 않은 토큰입니다.  ",
  },
  TOKEN_EMPTY: {
    isSuccess: false,
    code: 2002,
    message: " 토큰이 존재하지 않습니다. ",
  },
  EMAIL_EXISTS: {
    isSuccess: false,
    code: 2003,
    message: "이미 존재하는 이메일 계정입니다. ",
  },
  USERNAME_EXISTS: {
    isSuccess: false,
    code: 2004,
    message: "이미 존재하는 사용자 이름입니다. ",
  },
  PASSWORD_INVALID: {
    isSuccess: false,
    code: 2005,
    message: "최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 ",
  },
  EMAIL_INVALID: {
    isSuccess: false,
    code: 2006,
    message: "올바른 이메일 형식이 아닙니다. ",
  },
  EMAIL_NOT_EXIST: {
    isSuccess: false,
    code: 2007,
    message: "해당 이메일이 존재하지 않습니다",
  },
  PASSWD_NOT_EXACT: {
    isSuccess: false,
    code: 2008,
    message: "패스워드가 일치하지 않습니다. ",
  },
  TOKEN_NOT_EXIST: {
    isSuccess: false,
    code: 2009,
    message: "토큰이 존재하지 않습니다. ",
  },
  TOKEN_NOT_VERIFIED: {
    isSuccess: false,
    code: 2009,
    message: "정상적인 토큰이 아닙니다.",
  },
  USER_NOT_EXIST: {
    isSuccess: false,
    code: 2010,
    message: "해당 유저는 존재하지 않습니다. ",
  },
  USER_NOT_AUTH: {
    isSuccess: false,
    code: 2011,
    message: "해당 유저는 해당 기능을 수행할 권한이 없습니다",
  },
  IMAGE_NOT_EXIST: {
    isSuccess: false,
    code: 2012,
    message: "이미지 파일이 존재하지 않습니다. ",
  },

  BODY_NOT_CORRECT: {
    isSuccess: false,
    code: 2013,
    message: "바디에 정확하게 데이터가 들어있지 않습니다. 다시 확인해주세요",
  },
  CAFE_NOT_EXIST: {
    isSuccess: false,
    code: 2013,
    message: "해당 카페인덱스는 존재하지 않습니다. 다시 확인해주세요",
  },

  IMPOSSIBLE_SAME_USER: {
    isSuccess: false,
    code: 2013,
    message: "신청자와 대행자가 동일할 수 없다. ",
  },
  EXIST_DELIVERY_APPLY: {
    isSuccess: false,
    code: 2014,
    message: "이미 신청한 신청 내역입니다. ",
  },

  EMAIL_TRANSPORT_ERROR: {
    isSuccess: false,
    code: 2014,
    message: "이메일이 정상적으로 전송되지 않았습니다.  ",
  },
  DB_ERROR: { isSuccess: false, code: 4000, message: "데이터 베이스 에러" },
};
