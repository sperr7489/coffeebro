import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './index.module.css'

const Menu = () => {
    const navigate = useNavigate();
    return (
        <div className={style.menuOut}>
            <ul className={style.test}>
                <li className={style.noDot} onClick={()=>{navigate("/application")}}>배달 신청</li>
                <li className={style.noDot} onClick={()=>{navigate("/chat")}}>채팅</li>
                <li className={style.noDot} onClick={()=>{navigate("/deal")}}>거래 확인</li>
            </ul>
        </div>
    );
};

export default Menu;