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
  & > div {
    margin: 20px 0px 20px 20px;
  }
`;
