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
       INSERT INTO user (email, passwd, userName, department, sex, studentId, nickname,userImg)
          VALUES (?,?,?,?,?,?,?,?);    
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

// 유저의 인덱스와 이름과 닉네임 가져오기.
exports.getUserShortInfo = async (connection, email) => {
  const getUserShortInfoQuery = `
    select userIdx, userName, nickname from user 
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
exports.insertRequestDrink = async (
  connection,
  insertId,
  drinkIdx,
  optionList
) => {
  const insertRequestDrinkQuery = `
  insert into requestDrinkList
  (serviceApplicationIdx,
    drinkIdx,optionList)  
    value(?,?,?);
  `;

  const [insertRequestDrinkRow] = await connection.query(
    insertRequestDrinkQuery,
    [insertId, drinkIdx, optionList]
  );
  return insertRequestDrinkRow;
};

// // 배달 신청한 옵션 넣기
// exports.insertRequestOption = async (connection, insertId, optionIdx) => {
//   const insertRequestOptionQuery = `
//   insert into requestOptionList
//   (serviceApplicationIdx,
//     optionIdx)
//     value(?,?);
//   `;

//   const [insertRequestOptionRow] = await connection.query(
//     insertRequestOptionQuery,
//     [insertId, optionIdx]
//   );
//   return insertRequestOptionRow;
// };

// 배달 대행 중에서 해당 유저가 배달 대행을 하겠다고 지원한 신청 내역들 가져오기
/***
 * @todo : 배달  대행 지원 내역 가져오기 API 짜기
 *
 */
exports.getServiceApplicationIdx = async (connection, userIdx) => {
  const getServiceApplicationIdxQuery = `
  select * from deliveryApplication 
  where deliveryAgentIdx = ?
  `;

  const [getServiceApplicationIdxRow] = await connection.query(
    getServiceApplicationIdxQuery,
    userIdx
  );
  return getServiceApplicationIdxRow;
};

// 모든 ServiceApplicationIdx 가져오기
exports.getServiceApplicationIdxList = async (connection) => {
  const getServiceApplicationIdxListQuery = `
    select * from serviceApplication;
  `;
  const [getServiceApplicationIdxListRow] = await connection.query(
    getServiceApplicationIdxListQuery
  );
  return getServiceApplicationIdxListRow;
};

// 배달 서비스를 신청한 사람의 정보 가져오기
exports.getApplicantInfo = async (connection, serviceApplicationIdx) => {
  const getApplicantInfoQuery = `
  select u.userIdx,u.userName,u.nickname,u.department,u.sex,u.studentId,u.applicantScore,u.userImg from serviceApplication sa 
  left join user u on u.userIdx = sa.userIdx
  where sa.serviceApplicationIdx = ?
  ;
  `;

  const [getApplicantInfoRow] = await connection.query(
    getApplicantInfoQuery,
    serviceApplicationIdx
  );
  return getApplicantInfoRow;
};

// 자신이 신청한 모든 정보 가져오기
exports.getDeliveryInfos = async (connection, userIdx) => {
  const getDeliveryInfosQuery = `
  select serviceApplicationIdx,receiptTime,receiptPlace,cafeIdx,status from serviceApplication 
  where userIdx = ?
`;
  const [getDeliveryInfosRow] = await connection.query(
    getDeliveryInfosQuery,
    userIdx
  );
  return getDeliveryInfosRow;
};

// 배달 신청의 정보가져오기
exports.getDeliveryInfo = async (connection, serviceApplicationIdx) => {
  const getDeliveryInfoQuery = `
    select sa.serviceApplicationIdx,sa.userIdx,c.cafeIdx,c.cafeName,sa.receiptTime,sa.receiptPlace,sa.status,rd.optionList, d.drinkName,d.price from serviceApplication sa 
    join requestDrinkList rd on rd.serviceApplicationIdx =sa.serviceApplicationIdx
    join drink d on d.drinkIdx =rd.drinkIdx 
    join cafe c on c.cafeIdx = d.cafeIdx
    where sa.serviceApplicationIdx = ?
  `;
  const [getDeliveryInfoQueryRow] = await connection.query(
    getDeliveryInfoQuery,
    serviceApplicationIdx
  );
  return getDeliveryInfoQueryRow;
};

// 주문 요청한 건에 대한 하나의 정보 가져오기
exports.getOneDeliveryInfo = async (connection, serviceApplicationIdx) => {
  const getOneDeliveryInfoQuery = `
    select * from requestDrinkList rd
    join drink d on d.drinkIdx =rd.drinkIdx 
    join cafe c on c.cafeIdx = d.cafeIdx
    where rd.serviceApplicationIdx = ?   
  `;
  const [getOneDeliveryInfoRow] = await connection.query(
    getOneDeliveryInfoQuery,
    serviceApplicationIdx
  );
  return getOneDeliveryInfoRow;
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
    select * from deliveryApplication where  serviceApplicationIdx= ? and deliveryAgentIdx = ? and status = 0
    ) as exist
  `;
  const [existsDeliverApplyRow] = await connection.query(
    existsDeliverApplyQuery,
    [serviceApplicationIdx, userIdx]
  );
  return existsDeliverApplyRow;
};

// 배달 대행을 하겠다고 신청한 내역 가져오기
exports.getApplyInfos = async (connection, userIdx) => {
  const getAgentIdxsQuery = `
  select sa.serviceApplicationIdx,da.deliveryAgentIdx,u.userName as "배달 대행자",u.nickname,u.department,u.studentId,u.sex,u.userImg
  ,ifnull(u.deliveryAgentScore,0) as "배달 대행 평점", sa.receiptTime,c.cafeIdx ,c.cafeName, d.drinkName ,rd.optionList   
  from deliveryApplication da 
  left join serviceApplication sa on da.serviceApplicationIdx = sa.serviceApplicationIdx
  left join RequestDrinkList rd on rd.serviceApplicationIdx = sa.serviceApplicationIdx
  left join drink d on d.drinkIdx = rd.drinkIdx
  left join cafe c on c.cafeIdx =d.cafeIdx
  left join user u on u.userIdx  = da.deliveryAgentIdx
  where sa.userIdx = ?
  ;
  
  `;
  const [getAgentIdxsRow] = await connection.query(getAgentIdxsQuery, userIdx);
  return getAgentIdxsRow;
};

// 배달 서비스 신청 수락/거절 하기 => 신청 등록자 입장에서
exports.updateStatusOnAccept = async (
  connection,
  serviceApplicationIdx,
  acceptFlag,
  agentIdx
) => {
  const updateStatusOnAcceptQuery = [
    `update deliveryApplication set status = ${acceptFlag} where serviceApplicationIdx = ${serviceApplicationIdx} and deliveryAgentIdx = ${agentIdx};`,
    `update serviceApplication set status =${acceptFlag} where serviceApplicationIdx = ${serviceApplicationIdx}  ;`,
  ];
  if (acceptFlag == 1) {
    const updateOtherStatusQuery = `
    update deliveryApplication set status = -1 where serviceApplicationIdx = ${serviceApplicationIdx} and deliveryAgentIdx != ${agentIdx};
      `;
    updateStatusOnAcceptQuery.push(updateOtherStatusQuery);
  }

  let updateStatusOnAcceptRow = [];
  await Promise.all(
    updateStatusOnAcceptQuery.map(async (v, i) => {
      const [result] = await connection.query(v);
      updateStatusOnAcceptRow.push(result);
    })
  );

  return updateStatusOnAcceptRow;
};

// for 마이페이지
// 유저의 이름, 닉네임, 신청자 평점, 대행자 평점, 사진 가져오기
exports.getUserInfo = async (connection, userIdx) => {
  const getUserInfoQuery = `
    select userName, nickname, applicantScore, deliveryAgentScore, userImg from user 
    where userIdx = ?;
  `;
  const [[getUserInfoRow]] = await connection.query(getUserInfoQuery, userIdx);
  return getUserInfoRow;
};

// user가 자주 신청한 cafeIdx top3
exports.getMostVisitedCafeIdx = async (connection, userIdx) => {
  const getMostVisitedCafeIdxQuery = `
    SELECT cafeIdx, COUNT(*) AS count
    FROM serviceApplication
    WHERE userIdx = ?
    GROUP BY cafeIdx
    ORDER BY count DESC
    LIMIT 3;
  `;
  const [getMostVisitedCafeIdxRow] = await connection.query(
    getMostVisitedCafeIdxQuery,
    userIdx
  );
  return getMostVisitedCafeIdxRow;
};

// 닉네임 존재 여부
exports.nicknameCheck = async (connection, nickname) => {
  const nicknameCheckQuery = `
      select exists (
      select * from user where nickname = ?
      ) as exist
  `;
  const [[nicknameCheckRow]] = await connection.query(
    nicknameCheckQuery,
    nickname
  );
  return nicknameCheckRow.exist;
};

// 이미 신청한 내역인지 확인
exports.checkAlreadyApply = async (
  connection,
  serviceApplicationIdx,
  userIdx
) => {
  const checkAlreadyApplyQuery = `
  select exists ( select * from deliveryApplication where serviceApplicationIdx = ? and deliveryAgentIdx = ?) as exist
  `;
  const [[checkAlreadyApply]] = await connection.query(checkAlreadyApplyQuery, [
    serviceApplicationIdx,
    userIdx,
  ]);
  return checkAlreadyApply;
};

// 배달 신청자들에 대한 정보 가져오기
exports.getDeliveryAgents = async (connection, serviceApplicationIdx) => {
  const getDeliverAgentsQuery = `
  select da.deliveryAgentIdx,u.userName,u.department,u.sex,u.studentId,u.deliveryAgentScore,u.userImg,u.nickName,da.deliveryTime,da.status from deliveryApplication da
  left join user u on da.deliveryAgentIdx = u.userIdx
  where da.serviceApplicationIdx= ?

  `;
  const [getDeliverAgents] = await connection.query(
    getDeliverAgentsQuery,
    serviceApplicationIdx
  );
  return getDeliverAgents;
};

// 유저의 닉네임 수정
exports.updateUserNickname = async (connection, userIdx, nickname) => {
  const updateUserInfoQuery = `
  UPDATE User
  SET nickname = ?
  WHERE userIdx = ?
  `;
  const [updateUserInfoRow] = await connection.query(updateUserInfoQuery, [
    nickname,
    userIdx,
  ]);
  return updateUserInfoRow;
};

// 유저의 정보(닉네임과 사진) 수정
exports.updateUserImg = async (connection, userIdx, userImg) => {
  const updateUserInfoQuery = `
  UPDATE User
  SET  userImg = ?
  WHERE userIdx = ?
  `;
  const [updateUserInfoRow] = await connection.query(updateUserInfoQuery, [
    userImg,
    userIdx,
  ]);
  return updateUserInfoRow;
};

// 배달 대행 신청의 상태 완료로 바꾸기
exports.updateDeliveryApplicationStatus = async (
  connection,
  deliveryApplicationIdx
) => {
  const updateDeliveryApplicationStatusQuery = `
  UPDATE deliveryApplication
  SET status = 1
  WHERE deliveryApplicationIdx = ?;
  `;
  const [updateDeliveryApplicationStatusRow] = await connection.query(
    updateDeliveryApplicationStatusQuery,
    [deliveryApplicationIdx, deliveryApplicationIdx]
  );
  return updateDeliveryApplicationStatusRow;
};

// 서비스 신청의 상태 완료로 바꾸기
exports.updateServiceApplicationStatus = async (
  connection,
  deliveryApplicationIdx
) => {
  const updateServiceApplicationStatusQuery = `
  UPDATE serviceApplication
  SET status = 2
  WHERE serviceApplicationIdx = (SELECT serviceApplicationIdx
                                FROM deliveryApplication
                                WHERE deliveryApplicationIdx = ?);
  `;
  const [updateServiceApplicationStatusRow] = await connection.query(
    updateServiceApplicationStatusQuery,
    [deliveryApplicationIdx, deliveryApplicationIdx]
  );
  return updateServiceApplicationStatusRow;
};

// 배달 대행 서비스의 상태 받아오기
exports.getDeliveryApplicationStatus = async (
  connection,
  deliveryApplicationIdx
) => {
  const getDeliveryApplicationStatusQuery = `
  select status from deliveryApplication
  where deliveryApplicationIdx = ?
  `;
  const [[getDeliveryApplicationStatusRow]] = await connection.query(
    getDeliveryApplicationStatusQuery,
    deliveryApplicationIdx
  );
  return getDeliveryApplicationStatusRow;
};

// 배달 대행 신청의 대행자 userIdx 조회
exports.getDeliveryApplicationUser = async (
  connection,
  deliveryApplicationIdx
) => {
  const getDeliveryApplicationUserQuery = `
  select deliveryAgentIdx from deliveryApplication
  where deliveryApplicationIdx = ?
  `;
  const [[getDeliveryApplicationUserRow]] = await connection.query(
    getDeliveryApplicationUserQuery,
    deliveryApplicationIdx
  );
  return getDeliveryApplicationUserRow;
};

// 배달 대행 신청의 대상(서비스 신청자) userIdx 조회
exports.getServiceApplicationUser = async (
  connection,
  deliveryApplicationIdx
) => {
  const getServiceApplicationUserQuery = `
  SELECT userIdx
  FROM serviceApplication
  WHERE serviceApplicationIdx = (SELECT serviceApplicationIdx
                                 FROM deliveryApplication
                                 WHERE deliveryApplicationIdx = ?);
  `;
  const [[getServiceApplicationUserRow]] = await connection.query(
    getServiceApplicationUserQuery,
    deliveryApplicationIdx
  );
  return getServiceApplicationUserRow;
};

// 유저한테 알림 생성
exports.insertNotification = async (connection, userIdx, message) => {
  const insertNotificationQuery = `
  insert into notification(userIdx, message)
  values(?, ?);
  `;
  const [insertNotificationRow] = await connection.query(
    insertNotificationQuery,
    [userIdx, message]
  );
  return insertNotificationRow;
};

// 유저의 모든 아직 읽지 않은 알림 정보 가져오기
exports.getNotifications = async (connection, userIdx) => {
  const getNotificationsQuery = `
  SELECT notificationIdx, message, createdAt
  FROM notification
  WHERE userIdx = ? and readOrNot = 0;
  `;
  const [getNotificationsRow] = await connection.query(
    getNotificationsQuery,
    userIdx
  );
  return getNotificationsRow;
};

// 알림 읽음 처리
exports.updateNotification = async (connection, notificationIdx) => {
  const getNotificationsQuery = `
  Update notification
  set readOrNot=1 
  WHERE notificationIdx = ?
  `;
  const [updateNotificationRow] = await connection.query(
    getNotificationsQuery,
    notificationIdx
  );
  return updateNotificationRow;
};

// 서비스 신청자 평점 개수 늘리기
exports.updateApplicantScoreCnt = async (connection, applicantIdx) => {
  const updateApplicantScoreCntQuery = `
    INSERT INTO applicantScoreCnt (userIdx, count)
    VALUES (?, 1)
    ON DUPLICATE KEY
    UPDATE count=count+1;
    `;
  const [updateApplicantScoreCntRow] = await connection.query(
    updateApplicantScoreCntQuery,
    applicantIdx
  );
  return updateApplicantScoreCntRow;
};

// 서비스 신청자에 대한 평점 부여
exports.updateApplicantScore = async (connection, applicantIdx, score) => {
  const updateApplicantScoreQuery = `
    UPDATE user
    SET applicantScore = (applicantScore *
    ((SELECT count FROM applicantScoreCnt WHERE userIdx = ?)-1) + ?)
    / (SELECT count FROM applicantScoreCnt WHERE userIdx = ?) WHERE userIdx=?;
    `;
  const [updateApplicantScoreRow] = await connection.query(
    updateApplicantScoreQuery,
    [applicantIdx, score, applicantIdx, applicantIdx]
  );
  return updateApplicantScoreRow;
};

// 배달 대행자 평점 개수 늘리기
exports.updateDeliveryAgentScoreCnt = async (connection, deliveryAgentIdx) => {
  const updateDeliveryAgentScoreCntQuery = `
    INSERT INTO deliveryAgentScoreCnt (userIdx, count)
    VALUES (?, 1)
    ON DUPLICATE KEY
    UPDATE count=count+1;
    `;
  const [updateDeliveryAgentScoreCntRow] = await connection.query(
    updateDeliveryAgentScoreCntQuery,
    deliveryAgentIdx
  );
  return updateDeliveryAgentScoreCntRow;
};

// 배달 대행자에 대한 평점 부여
exports.updateDeliveryAgentScore = async (
  connection,
  deliveryAgentIdx,
  score
) => {
  const updateDeliveryAgentScoreQuery = `
    UPDATE user
    SET deliveryAgentScore = (deliveryAgentScore *
    ((SELECT count FROM deliveryAgentScoreCnt WHERE userIdx = ?)-1) + ?)
    / (SELECT count FROM deliveryAgentScoreCnt WHERE userIdx = ?) WHERE userIdx=?;
    `;
  const [updateDeliveryAgentScoreRow] = await connection.query(
    updateDeliveryAgentScoreQuery,
    [deliveryAgentIdx, score, deliveryAgentIdx, deliveryAgentIdx]
  );
  return updateDeliveryAgentScoreRow;
};
