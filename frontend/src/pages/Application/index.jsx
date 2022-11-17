import { useState } from 'react';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { cafeList, hourList, minuteList } from '../../utils/constants';
import { CafeSelect, Container, MainForm, TimeContainer } from './index.style';

export default function ApplicationPage() {
  const [isAm, setisAm] = useState(true);
  const [menu, setMenu] = useState('메뉴를 선택해 주세요.');
  const toggleIsAm = () => {
    setisAm((prev) => !prev);
    setMenu('');
  };
  return (
    <Container>
      <Header />
      <MainForm>
        <label htmlFor="cafe">카페</label>
        <CafeSelect name="cafe">
          {cafeList.map((cafeName) => (
            <option key={cafeName} value={cafeName}>
              {cafeName}
            </option>
          ))}
        </CafeSelect>
        <TimeContainer>
          <div>
            <label htmlFor="cafe">희망 시간 대</label>
            <button type="button" onClick={toggleIsAm}>
              {isAm ? '오전' : '오후'}
            </button>
          </div>
          <div>
            <select name="hour">
              {hourList.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <span>시</span>
          </div>
          <div>
            <select name="hour">
              {minuteList.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
            <span>분</span>
          </div>
        </TimeContainer>
        <label htmlFor="location">배송지</label>
        <input id="location" />
        <label htmlFor="menu">배달 희망 메뉴</label>
        <input type="button" id="menu" value={menu} />
        <label htmlFor="request">요청사항</label>
        <input id="request" />
      </MainForm>
      <Button handleClick={() => {}} content="신청하기" />
    </Container>
  );
}
