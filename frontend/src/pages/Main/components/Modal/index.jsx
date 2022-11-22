import Button from '../../../../components/Button';
import { CancleBtn, ContentContainer, InfoContainer, MainModalContainer } from './index.style';

export default function MainModal(props) {
  const { imgPath, cafeName, arriveLocation, arriveAt, grade, menu, closeModal } = props;
  return (
    <MainModalContainer>
      <CancleBtn onClick={closeModal}>x</CancleBtn>
      <ContentContainer>
        <img src={imgPath} />
        <InfoContainer>
          <span>카페 : {cafeName}</span>
          <span>메뉴 : {menu}</span>
          <span>평점 : {grade}</span>
          <span>배달 시간 : {arriveAt}</span>
          <span>배달 위치 : {arriveLocation}</span>
        </InfoContainer>
      </ContentContainer>
      <Button content="신청하기" handleClick={() => {}} />
    </MainModalContainer>
  );
}
