import axios from 'axios';
import React from 'react';
import style from './index.module.css';
import { useLayoutEffect } from 'react';
import { useState } from 'react';

const ApplyModal = ({ setOpen, list, modalIdx }) => {
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className={style.container}>
      <div className={style.upperContainer}>
        <input
          className={style.close}
          type="button"
          value="X"
          onClick={() => {
            setOpen(false);
          }}
        />
      </div>
      {list[modalIdx].deliveryInfo.map((data) => (
        <div className={style.innerContainer}>
          <div>
            <img className={style.modalImg} src={data.drinkImage} />
          </div>
          <div>
            <div>
              <span>주문 음료 : {data.drinkName}</span>
            </div>
            <div>
              <ul>
                {data.optionList.map((opt) => (
                  <li>{opt}</li>
                ))}
              </ul>
            </div>
            <div>
              <span>음료 가격: {data.coffeePrice}</span>
              <br />
              <span>옵션 가격: {data.optionPrice}</span>
              <br />
              <span>{`주문 총 금액: ${data.optionPrice + data.coffeePrice}`}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplyModal;
