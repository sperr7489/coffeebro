import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import style from './index.module.css'

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")

  const emailHandler = (event) => {
    setEmail(event.target.value);
  }

  const pwdHandler = (event) =>{
    setPwd(event.target.value)
  }

  const buttonHandler = () => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
    let url = "localhost:3000/user/login"
    
    if(regex.test(email) === false){
      alert("유효한 이메일 형식이 아닙니다.")
      return
    }

    if(email === ""){
      alert("아이디를 입력해주세요.")
      return
    }

    if(pwd === ""){
      alert("비밀번호를 입력해주세요")
      return
    }

    axios.post(url,{
      "email" : email,
      "passwd" : pwd
    })
    .then(response => {
      localStorage.clear()
      localStorage.setItem("")
      navigate("/")
    })
    .catch(error => {
      alert("등록된 계정이 아닙니다.")
      return
    })
  }

  const linkHandler = () => {
    navigate('/Description')
  }

  return (
    <div>
      <Header />
      <div className={style.outter}>
        <div className={style.term}>
          <span className={style.label}>아이디</span><br />
          <input type="text" onChange={emailHandler} className={style.input}/>
        </div>
        <div className={style.term}>
          <span className={style.label}>비밀번호</span><br />
          <input type="password" onChange={pwdHandler} className={style.input}/>
        </div>
        <div className={style.final}>
          <input className={style.button} type="button" value="로그인" onClick={buttonHandler}/>
          <input type="button" value="회원가입" onClick={linkHandler}/>
        </div>
      </div>
   </div>
  );
};

export default LoginPage;