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
    userImg,
    cafeName,
    receiptPlace,
    receiptTime,
    grade,
    deliveryInfo,
    closeModal,
    userInfo,
  } = props;
  const handleApplyClick = () => {
    authApi.post(`/user/delivery/${serviceApplicationIdx}`).then((res) => {
      if (!res.data.isSuccess) {
        return;
      }
      alert('신청이 완료되었습니다.');
      closeModal();
    });
  };
  console.log(userInfo);
  return (
    <MainModalContainer>
      <CancleBtn onClick={closeModal}>x</CancleBtn>
      <ContentContainer>
        <img src={!!userImg ? userImg : userImage} />
        <InfoContainer>
          <span>닉네임 : {userInfo.nickname}</span>
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
          <span>신청자 평점 : {userInfo.applicantScore}</span>
          <span>배달 시간 : {receiptTime}</span>
          <span>배달 위치 : {receiptPlace}</span>
        </InfoContainer>
      </ContentContainer>
      <Button content="신청하기" handleClick={() => handleApplyClick()} />
    </MainModalContainer>
  );
}
