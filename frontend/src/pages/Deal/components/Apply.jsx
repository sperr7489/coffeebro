import axios from 'axios';
import React, { useState } from 'react';
import style from '../index.module.css'
import ApplyModal from './ApplyModal';

const applyButtonHandle = () => {
    
}

const Apply = () => {
    const [num, setNum] = useState(0);
    const [open, setOpen] = useState(false)
    const [modalIdx, setModalIdx] = useState(0);

    const dummy = [
        {cafe: "스타벅스", date: '2022.12.01'},
        {cafe: "이디야커피", date: '2022.11.12'},
        {cafe: "메가커피", date: '2022.12.12'},
        {cafe: "굿커피", date: '2022.11.11'}
    ]

    const detail = [
        {name: '배달원 1', sex: 'M', rate: 3.7},
        {name: '배달원 2', sex: 'G', rate: 4.2},
        {name: '배달원 3', sex: 'M', rate: 5},
        {name: '배달원 4', sex: 'M', rate: 4}
    ]

    const showDetail = (index) => {
        setOpen(true)
        setModalIdx(index)
    }
    

    return (
        <div className={style.contentOutter}>
            <div className={style.left}>
                <ul className={style.inMenu}>
                    {dummy.map((data, index) => (
                        <li className={style.applyName} onClick={() => (setNum(index))}>
                            <span>{data.cafe}</span><br /><br />
                            <span>{data.date}</span><br/>
                            <input type='button' value="자세히" onClick={() => showDetail(index)}/>
                        </li>
                    ))}
                </ul>
                {open && <ApplyModal setOpen={setOpen} index={modalIdx}/>}
            </div>
            <div className={style.right}>
                    <div className={style.title}>
                        배달 신청자 목록
                    </div>
                    <div>
                        <ul className={style.inMenu}>
                            {detail.map(data => (
                                <li>
                                    <div className={style.deliverName}>
                                        {data.name} - {data.sex === 'M' ? '남자' : '여자'} - {data.rate}점
                                        <input type="button" value="배달 수락" className={style.deliverButton}/>
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