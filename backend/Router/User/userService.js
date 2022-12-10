const crypto = require("crypto");
const userDao = require("./userDao");
const { resultResponse, basicResponse } = require("../../config/response");
const baseResponseStatus = require("../../config/baseResponseStatus");
const { tokenSet } = require("../../config/jwt");
const { pool } = require("../../config/database");
const chatDao = require("../Chat/chatDao");

// 회원가입
exports.createUser = async (
  email,
  passwd,
  userName,
  department,
  sex,
  studentId,
  nickname
) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    let insertUserParams;
    // Password Hash

    const hashedPassword = await crypto
      .createHash("sha512")
      .update(passwd)
      .digest("base64");
    insertUserParams = [
      email,
      hashedPassword,
      userName,
      department,
      sex,
      studentId,
      nickname,
    ];

    const signUpResult = await userDao.insertUser(connection, insertUserParams);

    await connection.commit();
    return resultResponse(baseResponseStatus.SIGN_UP_SUCCESS, {
      userIdx: signUpResult.insertId,
    });
  } catch (error) {
    await connection.rollback();
    console.log(error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};

//로그인 => refreshToken
exports.logIn = async (email, passwd) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    const hashedPassword = await crypto
      .createHash("sha512")
      .update(passwd)
      .digest("base64");

    const signInCheckPasswd = await userDao.CheckPasswd(connection, email);
    const { userIdx, userName, nickname } = await userDao.getUserShortInfo(
      connection,
      email
    );

    if (hashedPassword == signInCheckPasswd.passwd) {
      //로그인에 성공하였을 때 jwt를 발급해주어야 한다.
      const accessToken = tokenSet().access(userIdx);
      const refreshToken = tokenSet().refresh(userIdx);

      const refreshTokenExist = await userDao.refreshTokenExist(
        connection,
        userIdx
      );

      if (refreshTokenExist.exist) {
        //refreshtoken이 존재한다면 이미 로그인한 전적이 있다는 것
        await userDao.updateToken(
          connection,
          userIdx,
          refreshToken,
          accessToken
        );
      } else {
        //refreshToken이 없다는 것은 로그인 내역이 없다는 것.
        await userDao.insertRefreshToken(
          connection,
          userIdx,
          refreshToken,
          accessToken
        );
      }
      await connection.commit();
      return resultResponse(baseResponseStatus.LOGIN_SUCCESS, {
        userIdx,
        userName,
        nickname,
        accessToken,
      });
    } else return basicResponse(baseResponseStatus.PASSWD_NOT_EXACT);
  } catch (error) {
    await connection.rollback();
    console.log(error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};

// AccessToekn 업데이트 하기
exports.updateAccessToken = async (id, accessToken) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    await userDao.updateAccessToken(connection, id, accessToken);
    await connection.commit();
  } catch (error) {
    await connection.rollback();

    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};

// 배달 대행 서비스 신청
exports.delivery = async (
  applicantIdx = userIdx,
  cafeIdx,
  receiptTime,
  receiptPlace,
  drinkInfos
) => {
  //  drinkInfos:
  //  [
  //   {
  //     drinkIdx :1,
  //     optionList : [1,2,3]
  //   }
  //   {
  //     drinkIdx :2,
  //     optionList : [1,2,3]
  //   }
  //  ]

  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    // 서비스 신청에 대한 쿼리
    const { insertId } = await userDao.insertServiceApplication(
      connection,
      applicantIdx,
      cafeIdx,
      receiptTime,
      receiptPlace
    );

    await Promise.all(
      drinkInfos.map(async (v, i) => {
        console.log("v.optionList : ", v.optionList);
        await userDao.insertRequestDrink(
          connection,
          insertId,
          v.drinkIdx,
          v.optionList.toString()
        );
      })
    );

    await connection.commit();
    return basicResponse(baseResponseStatus.SUCCESS);
  } catch (error) {
    await connection.rollback();
    console.log(error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};

// 우선 출발시간을 정하지 않고 배달 대행을 신청하는 과정
exports.deliveryApply = async (userIdx, serviceApplicationIdx) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    const [{ exist }] = await userDao.existsDeliverApply(
      connection,
      userIdx,
      serviceApplicationIdx
    );
    console.log(exist);
    if (exist) {
      return basicResponse(baseResponseStatus.EXIST_DELIVERY_APPLY);
    }

    // 서비스 신청에 대한 쿼리
    const test = await userDao.insertDeliveryApply(
      connection,
      userIdx,
      serviceApplicationIdx
    );

    await connection.commit();

    return basicResponse(baseResponseStatus.SUCCESS);
  } catch (error) {
    await connection.rollback();
    console.log(error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};

// 배달 서비스 신청 수락/거절 하기 => 신청 등록자 입장에서
exports.acception = async (
  userIdx,
  serviceApplicationIdx,
  acceptFlag,
  agentIdx
) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    // acceptFlag가 1이면 승낙, -1이면 거절 => 승낙할 경우 다른 대행 신청자들에 대한 내역은 -1로 바꿔준다.
    const acceptionStaus = await userDao.updateStatusOnAccept(
      connection,
      serviceApplicationIdx,
      acceptFlag,
      agentIdx
    );

    if (parseInt(acceptFlag) == 1) {
      // 채팅방을 개설해야한다.
      // userIdx : 배달 서비스 신청자
      // agentIdx : 배달 대행 신청자
      // const [{ insertId: chatRoomId }] = await chatDao.createChatRoom(
      //   connection,
      //   serviceApplicationIdx
      // );
      const { insertId: chatRoomIdx } = await chatDao.createChatRoom(
        connection,
        serviceApplicationIdx,
        userIdx,
        agentIdx
      );

      console.log("chatRoomIdx : ", chatRoomIdx);
      return chatRoomIdx;
    }

    await connection.commit();

    return -1; // -1 을 반환했다는 것은 거절했다는 뜻.
  } catch (error) {
    await connection.rollback();
    console.log(error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
};
