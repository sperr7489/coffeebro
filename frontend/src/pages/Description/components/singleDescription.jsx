import React from 'react';
import { useState, useEffect } from 'react';
import style from '../index.module.css'

const SingleDescription = ({name, detail, state, checkedItems, checkedItemHandeler}) => {
    const [isChecked, setIsChecked] = useState(null)

    const onCheck = (data) => {
        checkedItemHandeler(name, data.target.checked)
        setIsChecked(!isChecked)
    }

    useEffect(() => {
        if(checkedItems.includes(name))
            setIsChecked(true)
        else
            setIsChecked(false)
    }, [checkedItems])

    return (
        <div>
            <div>
                <input type="checkbox" checked={isChecked} onChange={data => onCheck(data)}/>{name}
                <span className={state ? style.essential : style.optional}>{state ? "(필수)" : "(선택)"}</span>
            </div>
            <div className={style.box}>
                {detail}
            </div>
        </div>
    );
};

export default SingleDescription;