import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  button {
    cursor: pointer;
  }
  & > button {
    position: fixed;
    left: calc(80% - 200px);
    bottom: 50px;
  }
`;
export const MainContentContainer = styled.div`
  width: 60%;
  margin-left: 20%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
