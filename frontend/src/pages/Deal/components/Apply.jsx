import axios from 'axios';
import React, { useState, useLayoutEffect } from 'react';
import style from '../index.module.css';
import ApplyModal from './ApplyModal';

const applyButtonHandle = () => {};

const Apply = ({cookies}) => {
  const [num, setNum] = useState(0);
  const [open, setOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);
  const [list, setList] = useState([])
  const [cafe, setCafe] = useState([])

  const showDetail = (index) => {
    setOpen(true);
    setModalIdx(index);
  };

  const registButton = (deliveryAgentIdx, serviceApplicationIdx) => {
      axios.post(`http://localhost:3000/user/apply/acception/${serviceApplicationIdx}`,{}, {
        headers: {
          accessToken: cookies
        },
        params:{
          acceptFlag: 1,
          deliveryAgentIdx: deliveryAgentIdx
        }
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useLayoutEffect(() => {
      let user;
      const earlyGet = () => {
      axios.get("http://localhost:3000/user/apply/infos",{
      headers:{
        accessToken: cookies
      }
      })
      .then(response => {
        setList(response.data.result)
      })
      .catch(error => {
        console.log(error)
      })
      }
    
      const cafeList = () => {
        axios.get('http://localhost:3000/cafe')
        .then(response => {
          setCafe(response.data.result)
        })
        .catch(error => {
          console.log(error)
        })
        }

        earlyGet()
        cafeList()
  }, [])

  return (
    <div className={style.contentOutter}>
      <div className={style.left}>
        <ul className={style.inMenu}>
          {list.map((data, index) => (
            cafe.filter(name => name.cafeIdx === data.cafeIdx).map(fin => (
              <li className={style.applyName} onClick={() => (setNum(index))}>
                <div>{fin.cafeName}</div>
                <input className={style.detail} type='button' value="자세히" onClick={() => showDetail(index)}/>  
              </li>
            ))
          ))}
        </ul>
        {open && <ApplyModal setOpen={setOpen} list={list} modalIdx={modalIdx}/>}
      </div>
      <div className={style.right}>
        <div className={style.title}>배달 신청자 목록</div>
        <div>
          {
            list.map((data, index) => (
              (index === num ? data.deliveryAgent.map(deliver => (
              <div className={style.innerDeliver}>
                <div>
                  이름: {deliver.userName}
                </div>
                <div>
                  학과: {deliver.department}
                </div>
                <div>
                  성별: {deliver.sex === 'M' ? "남자" : "여자"}
                </div>
                <div>
                  학번: {deliver.studentId}
                </div>
                <div>
                  평점: {deliver.deliveryAgentScore}
                </div>
                <div>        
                  <input type="button" value="신청하기" onClick={() => {registButton(deliver.deliveryAgentIdx, data.serviceApplicationIdx)}}/>
                </div>
              </div>
              )
              ) : <></>)
            ))}
        </div>
      </div>
    </div>
  );
};

export default Apply;
