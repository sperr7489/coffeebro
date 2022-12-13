import { CardContainer, InfoContainer } from './index.style';
import userImage from '../../../../assets/images/img_user.png';

export default function ApplicantCard(props) {
  const { userInfo, cafeName, receiptPlace, receiptTime, onClick } = props;
  const { userImg, nickname } = userInfo;
  return (
    <CardContainer onClick={onClick}>
      <img src={!!userImg ? userImg : userImage} />
      <InfoContainer>
        <span>닉네임 : {nickname ? nickname : '닉없음'}</span>
        <span>카페 : {cafeName}</span>
        <span>도착 장소 : {receiptPlace}</span>
        <span>도착 시간 : {receiptTime} </span>
      </InfoContainer>
    </CardContainer>
  );
}
