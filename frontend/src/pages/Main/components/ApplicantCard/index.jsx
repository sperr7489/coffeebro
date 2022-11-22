import { CardContainer, InfoContainer } from './index.style';

export default function ApplicantCard(props) {
  const { imgPath, cafeName, arriveLocation, arriveAt, onClick } = props;

  return (
    <CardContainer onClick={onClick}>
      <img src={imgPath} />
      <InfoContainer>
        <span>카페 : {cafeName}</span>
        <span>도착 장소 : {arriveLocation}</span>
        <span>도착 시간 : {arriveAt}</span>
      </InfoContainer>
    </CardContainer>
  );
}
