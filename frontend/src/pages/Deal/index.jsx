import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Header from '../../components/Header';
import Apply from './components/Apply';
import Deliver from './components/Deliver';
import style from './index.module.css';

const Deal = () => {
  const [place, setPlace] = useState(0);
  const tabBar = [{ name: '배달신청' }, { name: '배달대행' }];
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const beforeRender = () => {
      axios
        .get('http://localhost:3000/user/apply/infos', {
          headers: {
            accessToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTY3MDE2OTQ1OSwiZXhwIjoxNjcwMjU1ODU5fQ.AgN9VdmVPda0LjbmaWUmHszwp-_GGaU0s_mlHNxwIK8',
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(err);
        });
    };
  }, []);

  return (
    <div>
      <div>
        <div className={style.menu}>
          <ul className={style.inMenu}>
            {tabBar.map((data, index) => (
              <li
                className={style.object}
                onClick={() => {
                  setPlace(index);
                }}
              >
                {data.name}
              </li>
            ))}
          </ul>
        </div>
        {place === 0 ? <Apply /> : <Deliver />}
      </div>
    </div>
  );
};

export default Deal;
