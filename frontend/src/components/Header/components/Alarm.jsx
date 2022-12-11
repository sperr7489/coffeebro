import React from 'react';
import style from './index.module.css'
import { authApi } from '../../../../axios.config';
import { useEffect } from 'react';
import { useState } from 'react';

const Alarm = () => {
  const [data, setData] = useState([])
  
  useEffect(() => {
    const getAlarm = () => {
      authApi
      .get('/user/notifications')
      .then(response => {
        // console.log(response)
        setData(response.data.result)
      })
      .catch(error => {
        console.log(reponse)
      })
    }

    getAlarm();
  }, [])

  return (
    <div className={style.menuOut}>
      {data.length === 0 ? <span>알람이 없습니다</span> : 
      <ul>
        {data.map(msg => (
          <li>
            {msg.message}
          </li>
        ))}
      </ul>
      }
    </div>
  );
};

export default Alarm;
