// 카페의 정보 가져오기
exports.getCafeInfos = async (connection) => {
  const getCafeInfosQuery = `
    SELECT * FROM cafe
`;
  const [getCafeInfosResult] = await connection.query(getCafeInfosQuery);
  return getCafeInfosResult;
};

// 카페 이름의 존재성
exports.getCafeIdx = async (connection, cafeName) => {
  const cafeNameExistQeury = `
  select cafeIdx from cafe where cafeName =?;
`;
  // 두번 해줘야 한다. 그래야 {exist: 1}을 반환한다.
  const [[cafeNameExistResult]] = await connection.query(
    cafeNameExistQeury,
    cafeName
  );
  return cafeNameExistResult;
};

// 카페 넣기
exports.insertCafe = async (connection, cafeName) => {
  const insertCafeQuery = `
    insert into cafe(cafeName) values (?)
  `;
  const [insertCafeRow] = await connection.query(insertCafeQuery, cafeName);
  return insertCafeRow;
};

// 카페의 음료수 넣기
exports.insertDrink = async (
  connection,
  cafeIdx,
  drinkName,
  price,
  drinkImage
) => {
  const insertDrinkQuery = `
    insert into drink(cafeIdx, drinkName,price,drinkImage) values (?,?,?,?)
    `;
  const [insertDrinkRow] = await connection.query(insertDrinkQuery, [
    cafeIdx,
    drinkName,
    price,
    drinkImage,
  ]);
  return insertDrinkRow;
};
