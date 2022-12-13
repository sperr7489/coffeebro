import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Header from '../../components/Header';
import style from './index.module.css';
import axios from 'axios';
import { api } from '../../../axios.config';

const LoginPage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['id']);
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const pwdHandler = (event) => {
    setPwd(event.target.value);
  };

  const buttonHandler = () => {
    // let regex = new RegExp('[a-z0-9]+@ajou.ac.kr');

    // if (regex.test(email) === false) {
    //   alert('아주대학교 이메일 계정으로 로그인 바랍니다.');
    //   return;
    // }

    if (email === '') {
      alert('아이디를 입력해주세요.');
      return;
    }

    if (pwd === '') {
      alert('비밀번호를 입력해주세요');
      return;
    }

    api
      .post('/user/login', {
        email: email,
        passwd: pwd,
      })
      .then((response) => {
        if (response.data.code === 1112) {
          setCookie('id', response.data.result.accessToken);
          console.log(response);
          navigate('/');
          location.reload();
        } else if (response.data.code === 2008) {
          alert('회원가입 때 등록한 비밀번호를 입력해주세요');
        } else {
          alert('등록된 계정이 아닙니다');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const linkHandler = () => {
    navigate('/Description');
  };

  return (
    <div>
      <div className={style.outter}>
        <div className={style.term}>
          <span className={style.label}>아이디</span>
          <br />
          <input type="text" onChange={emailHandler} className={style.input} />
        </div>
        <div className={style.term}>
          <span className={style.label}>비밀번호</span>
          <br />
          <input type="password" onChange={pwdHandler} className={style.input} />
        </div>
        <div className={style.final}>
          <input className={style.button} type="button" value="로그인" onClick={buttonHandler} />
          <input type="button" value="회원가입" onClick={linkHandler} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
