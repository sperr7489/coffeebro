import { forwardRef, useEffect, useState } from 'react';
import Button from '../../../../components/Button';
import MenuInfo from '../MenuInfo';
import axios from 'axios';
import {
  ApplicationModalContainer,
  ButtonWrapper,
  ItemListConatiner,
  ModalBackground,
  RequestContainer,
  RequestListContainer,
} from './index.style';
import { api } from '../../../../../axios.config';

export default function ApplicationModal(props) {
  const { menuList, setMenuList, refs, setIsModalOpen, cafeIdx } = props;
  const [modalIdx, setModalIdx] = useState(0);
  const [menuInfo, setMenuInfo] = useState();
  const [requestList, setRequestList] = useState([]);
  const [menuInfoList, setMenuInfoList] = useState(menuList);
  const [animationName, setAnimationName] = useState('slide-in');
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [cafeMenuList, setCafeMenuList] = useState([]);
  const [optionList, setOptionList] = useState([]);

  const handleItemClick = (item) => {
    setMenuInfo((prev) => {
      const newState = { ...prev };
      newState['menu'] = item;
      return newState;
    });
    if (modalIdx === 0) {
      setIsRequestOpen(true);
      return;
    }
    setModalIdx((prev) => prev + 1);
  };
  useEffect(() => {
    async function getData() {
      api.get(`/cafe/${cafeIdx}/menu`).then((res) => {
        setCafeMenuList(res.data.result.drinkMenu);
        setOptionList(res.data.result.drinkOption);
      });
    }
    getData();
  }, [cafeIdx]);

  const removeRequestModal = () => {
    if (!isRequestOpen) {
      return;
    }
    setAnimationName('slide-out');
    setTimeout(() => {
      setIsRequestOpen(false);
      setAnimationName('slide-in');
    }, 450);
  };

  const handleRequestClick = (request) => {
    if (requestList.includes(request)) {
      setRequestList((prev) => prev.filter((req) => req !== request));
      return;
    }
    setRequestList((prev) => [...prev, request]);
  };

  useEffect(() => {
    setIsRequestOpen(false);
    setRequestList([]);
    if (modalIdx === 1) {
      const request = [];
      for (const item in requestList) {
        request.push(requestList[item].optionName);
      }
      setMenuInfoList((prev) => [...prev, { ...menuInfo, num: 1, request: request }]);
      return;
    }
  }, [modalIdx]);

  return (
    <ModalBackground>
      <ApplicationModalContainer ref={refs}>
        <button onClick={() => setIsModalOpen(false)}>x</button>
        {modalIdx === 1 ? (
          <MenuInfo menuInfoList={menuInfoList} setMenuInfoList={setMenuInfoList} />
        ) : (
          <ItemListConatiner onScroll={removeRequestModal}>
            {cafeMenuList.map((item, idx) => (
              <div onClick={() => handleItemClick(item)} key={`${item.cafeName} ${idx}`}>
                <img src={item.imaPath} />
                <span>{item['drinkName']}</span>
              </div>
            ))}
          </ItemListConatiner>
        )}
        {isRequestOpen && (
          <RequestListContainer className={animationName}>
            <button>aa</button>
            <div>
              {optionList.map((request, idx) => (
                <RequestContainer
                  key={`${request.optionName} ${idx}`}
                  onClick={() => {
                    handleRequestClick(request);
                  }}
                  isSelected={requestList.includes(request)}
                >
                  <span>{request.optionName}</span>
                </RequestContainer>
              ))}
            </div>
          </RequestListContainer>
        )}
        <ButtonWrapper>
          {modalIdx === 1 ? (
            <button onClick={() => setModalIdx(0)}>메뉴 추가하기</button>
          ) : (
            <button onClick={() => setModalIdx((prev) => (prev === 0 ? prev : prev - 1))}>
              뒤로가기
            </button>
          )}
          {isRequestOpen ? (
            <Button
              handleClick={() => {
                setModalIdx((prev) => prev + 1);
              }}
              content="다음으로"
            ></Button>
          ) : (
            <Button
              handleClick={() => {
                setMenuList(menuInfoList);
                setIsModalOpen(false);
              }}
              content="등록하기"
            ></Button>
          )}
        </ButtonWrapper>
      </ApplicationModalContainer>
    </ModalBackground>
  );
}
