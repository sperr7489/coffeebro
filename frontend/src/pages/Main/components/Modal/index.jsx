import Button from '../../../../components/Button';
import userImage from '../../../../assets/images/img_user.png';
import {
  CancleBtn,
  ContentContainer,
  InfoContainer,
  MainModalContainer,
  MenuInfoContainer,
} from './index.style';
import axios from 'axios';
import { authApi } from '../../../../../axios.config';
export default function MainModal(props) {
  const {
    serviceApplicationIdx,
    imgPath,
    cafeName,
    receiptPlace,
    receiptTime,
    grade,
    deliveryInfo,
    closeModal,
  } = props;
  const handleApplyClick = () => {
    authApi.post(`/user/delivery/${serviceApplicationIdx}`).then((res) => console.log(res));
  };
  return (
    <MainModalContainer>
      <CancleBtn onClick={closeModal}>x</CancleBtn>
      <ContentContainer>
        <img src={!!imgPath ? imgPath : userImage} />
        <InfoContainer>
          <span>카페 : {cafeName}</span>
          <span>메뉴 </span>
          <MenuInfoContainer>
            <div>
              <span>메뉴 이름</span>
              <span className="option">옵션</span>
              <span>개수</span>
              <span>가격</span>
            </div>
            {deliveryInfo.map((info, idx) => (
              <div key={`${info.drinkName} ${idx}`}>
                <span>{info.drinkName}</span>
                <span className="option">{info.option.join(', ')}</span>
                <span>{info.num}</span>
                <span>{info.optionPrice + info.price}</span>
              </div>
            ))}
          </MenuInfoContainer>
          <span>신청자 평점 : {grade}</span>
          <span>배달 시간 : {receiptTime}</span>
          <span>배달 위치 : {receiptPlace}</span>
        </InfoContainer>
      </ContentContainer>
      <Button content="신청하기" handleClick={() => handleApplyClick()} />
    </MainModalContainer>
  );
}
