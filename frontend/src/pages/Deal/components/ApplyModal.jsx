import axios from 'axios'
import React from 'react';
import style from '../index.module.css';
import { useLayoutEffect } from 'react';
import { useState } from 'react';

const ApplyModal = ({ setOpen, list, modalindex }) => {
  const [data, setData] = useState([])

  const closeModal = () => {
    setOpen(false);
  };

  useLayoutEffect(()=> {
    let param = list[modalIdx].serviceApplicationIdx
    
    const getData = () => {
        axios.get(`http://localhost:3000/user/delivery/info/${param}`,{
        headers:{
          accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUsImlhdCI6MTY3MDMxNjM1NSwiZXhwIjoxNjcwNDAyNzU1fQ.QigaN31j2-SDY3KxcUCTogog1I5FGH2Xf0lnPDT9eLE"
        }
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
        }
        getData()
    },[])

  return (
    <div className={style.container}>
      <div className={style.closeOut}>
        <input className={style.close} type="button" value="x" onClick={closeModal} />
      </div>
      <div>
        배달 요청 시각: {list[modalIdx].receiptTime}
      </div>
      <div>
        배달 수령 장소: {list[modalIdx].receiptPlace}
      </div>
    </div>
  );
};

export default ApplyModal;
