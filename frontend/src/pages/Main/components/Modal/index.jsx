import Button from '../../../../components/Button';
import userImage from '../../../../assets/images/img_user.png';
import {
  CancleBtn,
  ContentContainer,
  InfoContainer,
  MainModalContainer,
  MenuInfoContainer,
} from './index.style';

export default function MainModal(props) {
  const {
    serviceApplicationIdx,
    imgPath,
    cafeName,
    receiptPlace,
    receiptTime,
    grade,
    drinkInfos,
    closeModal,
  } = props;
  const handleApplyClick = () => {
    axio;
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
            </div>
            {drinkInfos.map((info) => (
              <div>
                <span>{info.name}</span>
                <span className="option">{info.option.join(', ')}</span>
                <span>개수</span>
              </div>
            ))}
          </MenuInfoContainer>
          <span>평점 : {grade}</span>
          <span>배달 시간 : {receiptTime}</span>
          <span>배달 위치 : {receiptPlace}</span>
        </InfoContainer>
      </ContentContainer>
      <Button content="신청하기" handleClick={() => handleApplyClick()} />
    </MainModalContainer>
  );
}
