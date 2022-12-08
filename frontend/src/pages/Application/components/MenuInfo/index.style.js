import styled from 'styled-components';

export const MenuInfoListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 480px;
  overflow: auto;
`;
export const MenuInfoListTitleWrapper = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  h3:last-child {
    width: 200px;
  }
`;
export const MenuInfoListContainer = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  text-align: center;
  div {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span:last-child {
      width: 200px;
    }
    div {
      display: flex;
      align-items: center;
      button {
        width: 20px;
        height: 20px;
        margin: 0px 5px 0px 5px;
        border: 1px solid #c5875b;
        border-radius: 50%;
        background: none;
        margin-bottom: 0px;
      }
    }
  }
`;
