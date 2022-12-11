import {
  MenuInfoListContainer,
  MenuInfoListTitleWrapper,
  MenuInfoListWrapper,
} from './index.style';

export default function MenuInfo(props) {
  const { setMenuInfoList, menuInfoList } = props;
  const handleMenuNum = (action, idx) => {
    const newList = [...menuInfoList];
    const newState = { ...newList[idx] };
    if (action === 'minus') {
      if (newState.num === 1) {
        setMenuInfoList((prev) => newList.filter((item, index) => index !== idx));
        return;
      }
      newState.num -= 1;
      newList[idx] = newState;
      setMenuInfoList(newList);
      return;
    }
    newState.num += 1;
    newList[idx] = newState;
    setMenuInfoList(newList);
  };

  return (
    <MenuInfoListWrapper>
      <MenuInfoListTitleWrapper>
        <h3>카페이름</h3>
        <h3>음료</h3>
        <h3>개수</h3>
        <h3>요청사항</h3>
      </MenuInfoListTitleWrapper>
      <MenuInfoListContainer>
        {menuInfoList.map((menu, idx) => (
          <div key={`${menu.menu.cafeName} ${menu.idx}`}>
            <span>{menu.menu.cafeName}</span>
            <span>{menu.menu.drinkName}</span>
            <div>
              <button type="button" onClick={() => handleMenuNum('minus', idx)}>
                -
              </button>
              <span>{menu.num}</span>
              <button type="button" onClick={() => handleMenuNum('plus', idx)}>
                +
              </button>
            </div>
            <span>{menu.request}</span>
          </div>
        ))}
      </MenuInfoListContainer>
    </MenuInfoListWrapper>
  );
}
