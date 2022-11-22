import styled from 'styled-components';

export const MainModalContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 820px;
  height: 500px;
  border: 1px solid black;
  justify-content: space-between;
  margin-left: -10px;
  margin-top: -10px;
  backdrop-filter: blur(12px);
  button:last-child {
    align-self: center;
    margin-bottom: 20px;
  }
`;
export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
`;
export const ContentContainer = styled.div`
  align-self: center;
  display: flex;
  justify-content: space-between;
  width: 500px;
  height: 250px;
  img {
    width: 200px;
    height: 200px;
  }
`;
export const SubmitBtn = styled.button`
  width: 200px;
  height: 100px;
  align-self: center;
  margin-bottom: 20px;
  font-size: 28px;
  background-color: #2eb233;
  border-radius: 10px;
  border: none;
`;
export const CancleBtn = styled.button`
  background: none;
  align-self: flex-end;
  border: 1px solid red;
  width: 40px;
  height: 40px;
`;
