import React, { useState, useEffect } from 'react';
import { api, authApi } from '../../../../axios.config';
import axios from 'axios'
import style from '../index.module.css';

const Deliver = ({cookies}) => {
  const [num, setNum] = useState(0);
  const [list, setList] = useState([]);

  useEffect(() => {
    const getDeliverList = () => {
      authApi
      .get('/user/apply/delivery/infos')
      .then(response => {
        setList(response.data.result)
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    }

    getDeliverList()
  }, [])

  const okButton = () => {
    authApi.post(`/user/delivery/complete/${list[num].deliveryApplicationIdx}`)
    .then(response => {
      alert("배달 완료!")
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div className={style.contentOutter}>
      <div className={style.left}>
        {list.length === 0 ? <span className={style.nodeliver}>배달 대행 신청 내역이 없습니다!</span> :
        <ul className={style.inMenu}>
          {list.map((data, index) => 
            <li className={style.applyName} onClick={() => setNum(index)}>
              <span>{data.applicantInfo[0].userName}</span><br /><br />
              <div className={data.status === 1 ? style.green : data.status === 0 ? style.yellow : style.red}>
                {data.status === 1 ? "수락" : data.status === 0 ? "대기" : "거절" }
              </div>
            </li>
          )}
        </ul>
    }
      </div>
      <div className={style.right}>
        <div className={style.title}>주문현황</div>
        {list.length === 0 ? <span className={style.innerNoOrder}>배달 대행 신청 내역이 없습니다!</span> :
        <div>
          <div>
            {list.length === 0 ? "" : <img src={list[num].cafeImg}/>}
          </div>
          <div>
            {list.length === 0 ? "" : 
              list[num].deliveryInfo.map(data => 
                <div className={style.complicatedInner}>
                  <div>
                    <img className={style.menuImg} src={data.drinkImage}/>
                  </div>
                  <div>
                    {list.length === 0 ? "" : <span>주문 카페 - {list[num].cafeName}</span>}<br />
                    <span>주문 음료 : {data.drinkName}</span><br />
                    <span>음료 가격 :{data.price}</span><br />
                    <span>옵션 추가 비용 :{data.optionPrice}</span><br />
                    <span>총 주문 개수 : {data.count}</span>
                    <ul>
                    {data.optionList.map(opt => <li>{opt}</li>)}
                    </ul>
                  </div>
                </div>)
            }
          </div>
          {list.length === 0 ? "" : <input className={style.deliverButton} type="button" value="배달완료" onClick = {okButton}/>}
        </div>
        }
      </div>
    </div>
  );
  return <></>
};

export default Deliver;
