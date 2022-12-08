import axios from 'axios';
import React, { useState } from 'react';
import style from '../index.module.css';
import ApplyModal from './ApplyModal';

const applyButtonHandle = () => {};

const Apply = () => {
  const [num, setNum] = useState(0);
  const [open, setOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);
  const [list, setList] = useState([])
  const [cafe, setCafe] = useState([])

  const dummy = [
    { cafe: '스타벅스', date: '2022.12.01' },
    { cafe: '이디야커피', date: '2022.11.12' },
    { cafe: '메가커피', date: '2022.12.12' },
    { cafe: '굿커피', date: '2022.11.11' },
  ];

  const showDetail = (index) => {
    setOpen(true);
    setModalIdx(index);
  };

  useLayoutEffect(() => {
      let user;
      const earlyGet = () => {
      axios.get("http://localhost:3000/user/delivery/infos",{
      headers:{
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUsImlhdCI6MTY3MDM5MDIzNSwiZXhwIjoxNjcwNDc2NjM1fQ.-yksi8cvHPr0rX2DoJEpj3lvmptwWocHv0FdNhAf0Gg"
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
                <span>{fin.cafeName}</span>
                <input type='button' value="자세히" onClick={() => showDetail(index)}/>
              </li>
            ))
          ))}
        </ul>
        {open && <ApplyModal setOpen={setOpen} list={list} modalIdx={modalIdx}/>}
      </div>
      <div className={style.right}>
        <div className={style.title}>배달 신청자 목록</div>
        <div>
          <ul className={style.inMenu}>
            {detail.map((data) => (
              <li>
                <div className={style.deliverName}>
                  {data.name} - {data.sex === 'M' ? '남자' : '여자'} - {data.rate}점
                  <input type="button" value="배달 수락" className={style.deliverButton} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Apply;
