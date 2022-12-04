import React, { useState } from 'react';
import style from '../index.module.css'

const Deliver = () => {
    const [num, setNum] = useState(0);
    const dummy = [
        {name: "홍길동", state: "수락"},
        {name: "신짱구", state: "대기"},
        {name: "김철수", state: "배달 완료"},
        {name: "김유리", state: "배달 완료"}
    ]

    const detail = [
        {menu: "coffee", map: "팔달관 303호"},
        {menu: "coke", map: "팔달관 309호"},
        {menu: "cake", map: "팔달관 203호"},
        {menu: "tea", map: "팔달관 312호"}
    ]

    return (
        <div className={style.contentOutter}>
            <div className={style.left}>
                <ul className={style.inMenu}>
                    {dummy.map((data, index) => (
                        <li className={style.applyName} onClick={() => (setNum(index))}>
                            <span>{data.name}</span><br /><br />
                            <span className={data.state === '수락' ? style.green : data.state === '대기' ? style.yellow : style.red}>{data.state}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={style.right}>
                    <div>
                        {detail[num].menu}
                    </div>
            </div>
        </div>
    );
};

export default Deliver;