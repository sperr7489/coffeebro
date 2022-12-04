import React, { useState } from 'react';
import Header from '../../components/Header';
import Apply from './components/Apply';
import Deliver from './components/Deliver';
import style from './index.module.css'

const Deal = () => {
    const [place, setPlace] = useState(0);
    const tabBar = [{name: '배달신청'}, {name: '배달대행'}]
    const [pos, setPos] = useState(0)

    return (
        <div>
            <Header />
            <div>
                <div className={style.menu}> 
                    <ul className={style.inMenu}>
                        {tabBar.map((data, index) => (
                            <li className={style.object} onClick={() => {setPlace(index)}}>{data.name}</li>
                        ))}
                    </ul>
                </div>
                {place === 0 ? <Apply /> : <Deliver />}
            </div>
        </div>
    );
};

export default Deal;