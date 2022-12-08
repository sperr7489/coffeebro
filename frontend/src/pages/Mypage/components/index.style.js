import styled from 'styled-components';

export const InfoImageConatiner = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid black;
`;

export const DropZoneContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  background: url('../../../assets/images/img_add.svg');
  cursor: pointer;
  img {
    width: 100%;
    height: 300px;
  }
  #basic-image {
    width: 50%;
    height: 150px;
  }
`;

export const InformationContainer = styled.div`
  margin-top: 33px;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
`;
