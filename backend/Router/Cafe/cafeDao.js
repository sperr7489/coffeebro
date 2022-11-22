exports.getCafeInfos = async (connection) => {
  const getCafeInfosQuery = `
    SELECT * FROM cafe
`;
  const [getCafeInfosResult] = await connection.query(getCafeInfosQuery);
  return getCafeInfosResult;
};
