import styled from 'styled-components';

export const MypageContainer = styled.div`
  width: 90%;
  margin-left: 5%;
  display: flex;
  & > button:last-child {
    position: fixed;
    margin-left: calc(50% - 100px);
    bottom: 100px;
  }
`;

export const UserInfoContainer = styled.div`
  margin-left: 20px;
  & > div {
    height: 50px;
  }
`;
