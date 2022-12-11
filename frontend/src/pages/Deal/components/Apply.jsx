import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { api, authApi } from '../../../../axios.config';
import style from '../index.module.css';
import ApplyModal from './ApplyModal';

const applyButtonHandle = () => {};

const Apply = ({ cookies }) => {
  const [num, setNum] = useState(0);
  const [open, setOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);
  const [list, setList] = useState([]);
  const [cafe, setCafe] = useState([]);

  const showDetail = (index) => {
    setOpen(true);
    setModalIdx(index);
  };

  const registButton = (deliveryAgentIdx, serviceApplicationIdx) => {
    authApi
      .post(`http://localhost:3001/user/apply/acception/${serviceApplicationIdx}`, {
        params: {
          acceptFlag: 1,
          deliveryAgentIdx: deliveryAgentIdx,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let user;

    const earlyGet = () => {
      authApi.get('/user/apply/infos')
      .then((response) => {
        setList(response.data.result)
      })
      .catch((error) => {
        console.log(error)
      })
    }

    const cafeList = () => {
      api.get('/cafe')
      .then((response) => {
        setCafe(response.data.result);
      })
      .then((error) => {
        console.log(error)
      })
    }

    earlyGet();
    cafeList();
  }, [])

  return (
    <div className={style.contentOutter}>
      <div className={style.left}>
        {list.length === 0 ? <span className={style.noOrder}>주문 내역이 없습니다!</span> :
        <ul className={style.inMenu}>
          {list.map((data, index) =>
            cafe
              .filter((name) => name.cafeIdx === data.cafeIdx)
              .map((fin) => (
                <li className={style.applyName} onClick={() => setNum(index)}>
                  <div>{fin.cafeName}</div>
                  <input
                    className={style.detail}
                    type="button"
                    value="자세히"
                    onClick={() => showDetail(index)}
                  />
                </li>
              )),
          )}
        </ul>
        }
        {open && <ApplyModal setOpen={setOpen} list={list} modalIdx={modalIdx} />}
      </div>
      <div className={style.right}>
        <div className={style.title}>배달 신청자 목록</div>
        {list.length === 0 ? <span className={style.innerNoOrder}>배달 지원자가 없습니다!</span> : 
        <div>
          {list.map((data, index) =>
            index === num ? (
              data.deliveryAgent.map((deliver) => (
                <div className={style.innerDeliver}>
                  <div>이름: {deliver.userName}</div>
                  <div>학과: {deliver.department}</div>
                  <div>성별: {deliver.sex === 'M' ? '남자' : '여자'}</div>
                  <div>학번: {deliver.studentId}</div>
                  <div>평점: {deliver.deliveryAgentScore}</div>
                  <div>
                    <input
                      type="button"
                      value="신청하기"
                      onClick={() => {
                        registButton(deliver.deliveryAgentIdx, data.serviceApplicationIdx);
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <></>
            ),
          )}
        </div>
        }
      </div>
    </div>
  );
};

export default Apply;
