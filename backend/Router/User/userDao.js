// 이메일 존재 여부
exports.emailCheck = async (connection, email) => {
  const emailCheckQuery = `
      select exists (
      select * from user where email = ?
      ) as exist
  `;
  const [[emailCheckRow]] = await connection.query(emailCheckQuery, email);
  return emailCheckRow.exist;
};

// DB에 유저 등록
exports.insertUser = async (connection, insertUserParams) => {
  const insertUserQuery = `
       INSERT INTO user (email, passwd, userName, department, sex, studentId)
          VALUES (?,?,?,?,?,?);    
      `;
  const [insertUserRow] = await connection.query(
    insertUserQuery,
    insertUserParams
  );
  return insertUserRow;
};

// 유저 존재 여부 확인
exports.userCheck = async (connection, userName, email, studentId) => {
  const userCheckQuery = `
  select exists (
    select * from user where email = ? and userName = ? and studentId = ?
    ) as exist
  `;
  const [[userCheckRow]] = await connection.query(userCheckQuery, [
    userName,
    email,
    studentId,
  ]);
  return userCheckRow;
};

// 패스워드 확인
exports.CheckPasswd = async (connection, email) => {
  const signInCheckPasswdQuery = `
        select passwd from user 
        where email = ?;
    `;
  const [[signInCheckPasswdRow]] = await connection.query(
    signInCheckPasswdQuery,
    email
  );
  return signInCheckPasswdRow;
};

// 유저의 인덱스와 이름 가져오기.
exports.getUserShortInfo = async (connection, email) => {
  const getUserShortInfoQuery = `
    select userIdx, userName from user 
    where email = ?;
  `;
  const [[getUserShortInfoRow]] = await connection.query(
    getUserShortInfoQuery,
    email
  );
  return getUserShortInfoRow;
};

// Refresh 토큰 추가하기
exports.insertRefreshToken = async (
  connection,
  userIdx,
  refreshToken,
  accessToken
) => {
  const insertRefreshTokenQuery = `
    insert into token(userIdx,refreshToken,accessToken) value(?,?,?);
  `;
  const [insertRefreshTokenRow] = await connection.query(
    insertRefreshTokenQuery,
    [userIdx, refreshToken, accessToken]
  );

  return insertRefreshTokenRow;
};

// 토큰 업데이트 하기
exports.updateToken = async (
  connection,
  userIdx,
  refreshToken,
  accessToken
) => {
  const updateTokenQuery = `
  update token set refreshToken= ?, accessToken = ? 
  where userIdx = ?
`;
  const updateTokenRow = connection.query(updateTokenQuery, [
    refreshToken,
    accessToken,
    userIdx,
  ]);
  return updateTokenRow;
};

// refreshToken의 존재성 파악
exports.refreshTokenExist = async (connection, userIdx) => {
  const refreshTokenExistQuery = `
  select exists (
    select * from token where userIdx = ?
    ) as exist
`;
  const [[refreshTokenExistRow]] = await connection.query(
    refreshTokenExistQuery,
    userIdx
  );
  return refreshTokenExistRow;
};

// RefreshToken을 가져오기
exports.getRefreshToken = async (connection, accessToken) => {
  const getRefreshTokenQuery = `
    select refreshToken from token 
    where accessToken = ?
  `;
  const [[getRefreshTokenRow]] = await connection.query(
    getRefreshTokenQuery,
    accessToken
  );
  return getRefreshTokenRow;
};

exports.updateAccessToken = async (connection, id, accessToken) => {
  const updateAccessTokenQuery = `
  update token set accessToken = ? 
  where userIdx = ?
`;
  const updateAccessTokenRow = await connection.query(updateAccessTokenQuery, [
    accessToken,
    id,
  ]);
  return updateAccessTokenRow;
};
