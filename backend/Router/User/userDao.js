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

// 배달 대행 서비스 신청자 기입하기
exports.insertServiceApplication = async (
  connection,
  applicantIdx,
  cafeIdx,
  receiptTime,
  receiptPlace
) => {
  const insertServiceApplicationQuery = `
  insert into serviceApplication (
    userIdx,
    cafeIdx,
    receiptTime,
    receiptPlace
    ) 
    values(?,?,?,?);
  `;

  const [insertServiceApplicationRow] = await connection.query(
    insertServiceApplicationQuery,
    [applicantIdx, cafeIdx, receiptTime, receiptPlace]
  );

  console.log("test : 더!");
  return insertServiceApplicationRow;
};

// 배달 신청한 음료를 넣기
exports.insertRequestDrink = async (connection, insertId, drinkIdx) => {
  const insertRequestDrinkQuery = `
  insert into requestDrinkList
  (serviceApplicationIdx,
    drinkIdx)  
    value(?,?);
  `;

  const [insertRequestDrinkRow] = await connection.query(
    insertRequestDrinkQuery,
    [insertId, drinkIdx]
  );
  return insertRequestDrinkRow;
};

// 배달 신청한 옵션 넣기
exports.insertRequestOption = async (connection, insertId, optionIdx) => {
  const insertRequestOptionQuery = `
  insert into requestOptionList
  (serviceApplicationIdx,
    optionIdx)  
    value(?,?);
  `;

  const [insertRequestOptionRow] = await connection.query(
    insertRequestOptionQuery,
    [insertId, optionIdx]
  );
  return insertRequestOptionRow;
};
// 배달 신청의 정보가져오기
exports.getDeliveryInfo = async (connection, serviceApplicationIdx) => {
  const getDeliveryInfoQuery = `
    select * from serviceApplication sa 
    join requestDrinkList rd on rd.serviceApplicationIdx =sa.serviceApplicationIdx
    where sa.serviceApplicationIdx = ?
  `;
  const [getDeliveryInfoQueryRow] = await connection.query(
    getDeliveryInfoQuery,
    serviceApplicationIdx
  );
  return getDeliveryInfoQueryRow;
};

exports.insertDeliveryApply = async (
  connection,
  userIdx,
  serviceApplicationIdx
) => {
  const insertDeliveryApplyQuery = `
    insert into deliveryApplication(deliveryAgentIdx,serviceApplicationIdx)
    values(?,?)
  `;
  const [insertDeliveryApplyRow] = await connection.query(
    insertDeliveryApplyQuery,
    [userIdx, serviceApplicationIdx]
  );
  return insertDeliveryApplyRow;
};

// 내가 이미 신청한 배달 서비스 요청인지 확인하기
exports.existsDeliverApply = async (
  connection,
  userIdx,
  serviceApplicationIdx
) => {
  const existsDeliverApplyQuery = `
  select exists (
    select * from deliveryApplication where  serviceApplicationIdx= ? and deliveryAgentIdx = ?
    ) as exist
  `;
  const [existsDeliverApplyRow] = await connection.query(
    existsDeliverApplyQuery,
    [serviceApplicationIdx, userIdx]
  );
  return existsDeliverApplyRow;
};

exports.getApplyInfos = async (connection, userIdx) => {
  const getAgentIdxsQuery = `
  select da.deliveryAgentIdx, sa.receiptTime, c.cafeName, d.drinkName,ifnull(do.optionName,"옵션X") as optionName,(d.price + ifnull(do.price,0)) as price   from deliveryApplication da 
  left join serviceApplication sa on da.serviceApplicationIdx = sa.serviceApplicationIdx
  left join RequestDrinkList rdl on rdl.serviceApplicationIdx = sa.serviceApplicationIdx
  left join  drink d on d.drinkIdx = rdl.drinkIdx
  left join cafe c on c.cafeIdx = d.cafeIdx
  left join requestOptionList rol on rol.serviceApplicationIdx=sa.serviceApplicationIdx
  left join drinkOption do on do.optionIdx = rol.optionIdx
  where sa.userIdx = ?
  ;
  `;
  const [getAgentIdxsRow] = await connection.query(getAgentIdxsQuery, userIdx);
  return getAgentIdxsRow;
};
