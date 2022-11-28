import React, { useState } from 'react';
import style from '../index.module.css'

const applyButtonHandle = () => {
    
}

const Apply = () => {
    const [num, setNum] = useState(0);
    const dummy = [
        {name: "홍길동", cafe: "스타벅스"},
        {name: "신짱구", cafe: "이디야커피"},
        {name: "김철수", cafe: "메가커피"},
        {name: "김유리", cafe: "굿커피"}
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
                        <li className={style.applyName} onClick={() => (setNum(index))}>{data.name}</li>
                    ))}
                </ul>
            </div>
            <div className={style.right}>
                    <div>
                        {detail[num].menu}
                    </div>
                    <div>
                         <input type="button" value="신청하기"/>
                    </div>
            </div>
        </div>
    );
};

export default Apply;