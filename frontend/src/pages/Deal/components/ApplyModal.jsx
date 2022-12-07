import React from 'react';
import style from '../index.module.css';

const ApplyModal = ({setOpen, index}) => {
    const closeModal = () => {
        setOpen(false)
    }

    return (
        <div className={style.container}>
            <div className={style.closeOut}>
                <input className={style.close} type="button" value='x' onClick={closeModal}/>
            </div>
            <div>
                {index}
            </div>
        </div>
    );
};

export default ApplyModal;