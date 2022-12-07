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

// 카페 인덱스 존재성
exports.getCafeIdxExist = async (connection, cafeIdx) => {
  const getCafeIdxExistQeury = `
    select exists (select * from cafe where cafeIdx= ? ) as exist;
`;
  const [[getCafeIdxExistResult]] = await connection.query(
    getCafeIdxExistQeury,
    cafeIdx
  );
  return getCafeIdxExistResult;
};
// 카페 넣기
exports.insertCafe = async (connection, cafeName, cafeImg) => {
  const insertCafeQuery = `
    insert into cafe(cafeName,cafeImg) values (?,?)
  `;
  const [insertCafeRow] = await connection.query(insertCafeQuery, [
    cafeName,
    cafeImg,
  ]);
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

// 카페에 샷추가, 연하게 와 같은 옵션 넣기
exports.insertOption = async (connection, cafeIdx, optionName, price) => {
  const insertOptionQuery = `
  insert into drinkOption(cafeIdx, optionName,price) values (?,?,?)
  `;
  const [insertOptionRow] = await connection.query(insertOptionQuery, [
    cafeIdx,
    optionName,
    price,
  ]);
  return insertOptionRow;
};

//카페 메뉴 가져오기
exports.getCafeMenu = async (connection, cafeIdx) => {
  const getCafeMenuQuery = `
    select c.cafeIdx,c.cafeName,d.drinkIdx,d.drinkName,d.price as drinkPrice, d.drinkImage from Cafe c 
    join drink d on d.cafeIdx = c.cafeIdx
    where c.cafeIdx = ?
    ; 
`;
  const [getCafeMenuRow] = await connection.query(getCafeMenuQuery, cafeIdx);
  return getCafeMenuRow;
};

//카페 옵션 가져오기
exports.getCafeOption = async (connection, cafeIdx) => {
  const getCafeOptionQuery = `
    select c.cafeIdx,c.cafeName,do.optionIdx,do.optionName,do.price as optionPrice from Cafe c 
    join drinkOption do on do.cafeIdx = c.cafeIdx
    where c.cafeIdx = ?
    ; 
`;
  const [getCafeOptionRow] = await connection.query(
    getCafeOptionQuery,
    cafeIdx
  );
  return getCafeOptionRow;
};

// 카페의 옵션 리스트의 이름 가져오기
exports.getOptionList = async (connection, optionIdxList) => {
  const getOptionListQuery = `
  SELECT * FROM coffeebro.drinkOption where optionIdx in ?;
  `;
  const [getOptionListRow] = await connection.query(getOptionListQuery, [
    [optionIdxList],
  ]);
  return getOptionListRow;
};
