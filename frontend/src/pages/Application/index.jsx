import { forwardRef, useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import Header from '../../components/Header';
import ApplicationModal from './components/Modal';
import { cafeList, hourList, minuteList } from '../../utils/constants';
import { CafeSelect, Container, MainForm, TimeContainer } from './index.style';
import MenuInfo from './components/MenuInfo';
import LoginCheck from '../Login/components/LoginCheck';

export default function ApplicationPage() {
  const [isAm, setisAm] = useState(true);
  const [menuList, setMenuList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();
  const clickEvent = (e) => {
    console.log(modalRef.current);
    if (isModalOpen && !modalRef.current?.contains(e.target)) {
      setIsModalOpen(false);
    }
  };
  const toggleIsAm = () => {
    setisAm((prev) => !prev);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  useEffect(() => {
    // console.log(isModalOpen);
    // window.addEventListener("click", clickEvent);
    // return () => {
    // 	window.removeEventListener("click", clickEvent);
    // };
  }, [isModalOpen]);
  return (
    <Container>
      <LoginCheck />
      <MainForm onSubmit={handleSubmit}>
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
            <select name="hour" id="hour">
              {hourList.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <span>시</span>
          </div>
          <div>
            <select name="minute" id="minute">
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
        <input id="location" required />
        <label htmlFor="menu">배달 희망 메뉴</label>
        <input
          type="button"
          id="menu"
          required
          value="메뉴 추가하기"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
        />
        <MenuInfo menuInfoList={menuList} setMenuInfoList={setMenuList} />
        {/* {menuList.map((menu) => (
					<div>{menu.cafe}</div>
				))} */}
        <Button handleClick={() => {}} content="신청하기" />
      </MainForm>
      {isModalOpen && (
        <ApplicationModal
          refs={modalRef}
          setMenuList={setMenuList}
          menuList={menuList}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </Container>
  );
}
