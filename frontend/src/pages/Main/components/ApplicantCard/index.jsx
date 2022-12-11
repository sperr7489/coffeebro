import { CardContainer, InfoContainer } from './index.style';
import userImage from '../../../../assets/images/img_user.png';

export default function ApplicantCard(props) {
  const { imgPath, cafeName, receiptPlace, receiptTime, onClick } = props;

  return (
    <CardContainer onClick={onClick}>
      <img src={!!imgPath ? imgPath : userImage} />
      <InfoContainer>
        <span>카페 : {cafeName}</span>
        <span>도착 장소 : {receiptPlace}</span>
        <span>도착 시간 : {receiptTime}</span>
      </InfoContainer>
    </CardContainer>
  );
}
