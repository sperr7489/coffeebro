module.exports = {
  email: function (email) {
    const emailRegex = /[a-zA-Z0-9+-\_.]+@(ajou)+\.[a-z]{2,3}\.kr/gi;
    return emailRegex.test(email); // 정규식을 만족한다면 ture를 반환하겠지
  },
  passwd: function (passwd) {
    const reg =
      /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;
    return reg.test(passwd);
  },
  nickname: function (nickname) {
    const reg =
        /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;
    return reg.test(nickname);
  },
};
