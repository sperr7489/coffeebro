import React, { useState } from 'react';
import style from '../index.module.css';

const Deliver = ({cookies}) => {
  const [num, setNum] = useState(0);
  const dummy = [
    { name: '홍길동', state: '수락' },
    { name: '신짱구', state: '대기' },
    { name: '김철수', state: '배달 완료' },
    { name: '김유리', state: '배달 완료' },
  ];

  const detail = [
    {
      menu: [
        { name: '아메리카노', option: ['연하게', '얼음많이'] },
        { name: '버블티', option: ['펄 많이'] },
        { name: '허브티', option: ['허브 x'] },
      ],
      map: '팔달관 303호',
      price: '15,000',
    },
    {
      menu: [
        { name: '아메리카노', option: ['연하게', '얼음많이'] },
        { name: '버블티', option: ['펄 많이'] },
        { name: '허브티', option: ['허브 x'] },
      ],
      map: '팔달관 303호',
      price: '23,000',
    },
    {
      menu: [
        { name: '아메리카노', option: ['연하게', '얼음많이'] },
        { name: '버블티', option: ['펄 많이'] },
        { name: '허브티', option: ['허브 x'] },
      ],
      map: '팔달관 303호',
      price: '90,000',
    },
    {
      menu: [
        { name: '아메리카노', option: ['연하게', '얼음많이'] },
        { name: '버블티', option: ['펄 많이'] },
        { name: '허브티', option: ['허브 x'] },
      ],
      map: '팔달관 303호',
      price: '46,000',
    },
  ];

  // const onStateChange = () = > {

  // }

  return (
    <div className={style.contentOutter}>
      <div className={style.left}>
        <ul className={style.inMenu}>
          {dummy.map((data, index) => (
            <li className={style.applyName} onClick={() => setNum(index)}>
              <span>{data.name}</span>
              <br />
              <br />
              <div
                className={
                  data.state === '수락'
                    ? style.green
                    : data.state === '대기'
                    ? style.yellow
                    : style.red
                }
              >
                {data.state}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={style.right}>
        <div className={style.title}>주문현황</div>
        <div className={style.deliverInner}>
          <div>
            <ul className={style.inMenu}>
              {detail[num].menu.map((data) => (
                <li>
                  <div className={style.term}>
                    {data.name} -{' '}
                    {data.option.map((data) => (
                      <span>{data} </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.term}>주문금액: {detail[num].price}</div>
          <div>배달 주소: {detail[num].map}</div>
        </div>
        <div>
          <input type="button" value="배달 완료" />
        </div>
      </div>
    </div>
  );
};

export default Deliver;
