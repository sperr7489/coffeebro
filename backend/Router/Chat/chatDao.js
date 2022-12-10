// 채팅방 생성하기
exports.createChatRoom = async (
  connection,
  serviceApplicationIdx,
  applicantIdx = userIdx,
  agentIdx
) => {
  const createChatRoomQuery = `
    insert into chatRoom(serviceApplicationIdx,applicantIdx,agentIdx) values (?,?,?);
    `;
  const [createChatRoomRow] = await connection.query(createChatRoomQuery, [
    serviceApplicationIdx,
    applicantIdx,
    agentIdx,
  ]);
  return createChatRoomRow;
};

// 한 유저의 채팅방들 가져오기
exports.getChatRoom = async (connection, userIdx) => {
  const getChatRoomQuery = `
    select * from chatRoom where applicantIdx = ? or agentIdx = ?
  `;
  const [getChatRoomRow] = await connection.query(getChatRoomQuery, [
    userIdx,
    userIdx,
  ]);
  return getChatRoomRow;
};

// 채팅방의 기본 정보 가져오기 => serviceApplication이 뭐고 신청자 대행자는 누군지
exports.getChatRoomInfo = async (connection, chatRoomIdx) => {
  const getChatRoomInfoQuery = `
      SELECT * FROM chatRoom
      where chatRoomIdx =?
;
  `;
  const [getChatRoomInfoRow] = await connection.query(
    getChatRoomInfoQuery,
    chatRoomIdx
  );
  return getChatRoomInfoRow;
};
