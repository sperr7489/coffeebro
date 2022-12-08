import { forwardRef, useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import ApplicationModal from './components/Modal';
import { hourList, minuteList } from '../../utils/constants';
import { CafeSelect, Container, MainForm, TimeContainer } from './index.style';
import MenuInfo from './components/MenuInfo';
import axios from 'axios';

export default function ApplicationPage() {
  const [isAm, setisAm] = useState(true);
  const [menuList, setMenuList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cafeList, setCafeList] = useState([]);
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
  useEffect(() => {
    async function getData() {
      axios.get(`http://localhost:3001/cafe`).then((res) => {
        setCafeList(res.data.result);
      });
    }
    getData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const drinkInfos = [];
    for (const idx in menuList) {
      for (let i = 0; i < menuList[idx].num; i++) {
        drinkInfos.push({
          drinkIdx: menuList[idx].menu.drinkIdx,
          optionList: menuList[idx].request,
        });
      }
    }
    const date = new Date();

    axios.post(`http://localhost:3001/user/delivery`, {
      cafeIdx: e.target.cafe.value,
      receiptTime: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${
        isAm ? Number(e.target.hour.value) : Number(e.target.hour.value) + 12
      }:${e.target.minute.value}`,
      receiptPlace: e.target.location.value,
      drinkInfos: drinkInfos,
    });
  };

  return (
    <Container>
      <MainForm onSubmit={handleSubmit}>
        <label htmlFor="cafe">카페</label>
        <CafeSelect name="cafe">
          {cafeList.map((cafe, idx) => (
            <option key={`${cafe.cafeName} ${idx}`} value={cafe.cafeIdx}>
              {cafe.cafeName}
            </option>
          ))}
        </CafeSelect>
        <TimeContainer>
          <div>
            <label>희망 시간 대</label>
            <button type="button" onClick={toggleIsAm}>
              {isAm ? '오전' : '오후'}
            </button>
          </div>
          <div>
            <select name="hour" id="hour">
              {hourList.map((hour, idx) => (
                <option key={`${hour} ${idx}`} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <span>시</span>
          </div>
          <div>
            <select name="minute" id="minute">
              {minuteList.map((minute, idx) => (
                <option key={`${minute} ${idx}`} value={minute}>
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
