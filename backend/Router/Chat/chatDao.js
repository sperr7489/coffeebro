exports.createChatRoom = async (
  connection,
  serviceApplicationIdx,
  userIdx,
  agentIdx
) => {
  const createChatRoomQuery = `
    insert into chatRoom(serviceApplicationIdx,userIdx,agentIdx) values (?,?,?);
    `;
  const createChatRoomRow = await connection.query(createChatRoomQuery, [
    serviceApplicationIdx,
    userIdx,
    agentIdx,
  ]);
  return createChatRoomRow;
};
