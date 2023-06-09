import styled from 'styled-components';

export const HeaderContainer = styled.div`
  width: 90%;
  margin-top: 20px;
  margin-bottom: 50px;
  display: flex;
  position: relative;
  justify-content: space-between;
  margin-left: 5%;
  img {
    width: 32px;
  }
  #logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    img {
      width: 100px;
    }
  }
  button {
    border: none;
    background: none;
  }
`;

export const RightChildContainer = styled.div`
  width: 100px;
  display: flex;
  position: relative;
  justify-content: space-between;
`;
