import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    cursor: pointer;
  }
  & > button {
    align-self: center;
    margin-top: 20px;
  }

  option {
    background-color: black;
    font-size: 12px;
  }
`;
export const MainForm = styled.form`
  label {
    display: block;
    font-size: 28px;
    margin-bottom: 10px;
    margin-top: 20px;
  }
  button {
    width: 100px;
    height: 50px;
    background: none;
    border: 1px solid black;
    font-size: 36px;
  }
  input {
    width: 500px;
    height: 50px;
    box-sizing: border-box;
  }
  input[type='button'] {
    background: none;
    border: 1px solid black;
    cursor: pointer;
  }
`;
export const CafeSelect = styled.select`
  width: 500px;
  height: 50px;
  font-size: 36px;
  text-align: center;
`;

export const TimeContainer = styled.div`
  width: 500px;
  select {
    width: 110px;
    height: 50px;
    margin: 0px 20px 0px 20px;
    text-align: center;
  }
  display: flex;
  justify-content: space-between;
  & > div {
    align-self: flex-end;
  }
`;
