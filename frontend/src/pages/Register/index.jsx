import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { data } from './data';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import style from './index.module.css';
import { api } from '../../../axios.config';

const Register = () => {
  const [name, setName] = useState('');
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState();
  const [typeCode, setTypeCode] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [dept, setDept] = useState('');
  const [sex, setSex] = useState('');
  const [id, setId] = useState('');
  const [img, setImg] = useState('')

  const [isName, setIsName] = useState(false); //가입하기 버튼 클릭할 때 검증
  const [isEmailConfirm, setIsEmailConfirm] = useState(false); //가입하기 버튼 클릭할 때 검증
  const [isNick, setIsNick] = useState(false); //가입하기 버튼 클릭할 때 검증
  const [isPwd, setIsPwd] = useState(false); //
  const [isDept, setIsDept] = useState(false); //가입하기 버튼 클릭할 때 검증
  const [isSex, setIsSex] = useState(false); //가입하기 버튼 클릭할 때 검증
  const [isPwdConfirm, setIsPwdConfirm] = useState(false); //가입하기 버튼 클릭할 때 검증
  const [isId, setIsId] = useState(false); //가입하기 버튼 클릭할 때 검증

  const [pwdConfirmMsg, setPwdConfirmMsg] = useState('');
  const [nickConfirmMsg, setNickconfirmMsg] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const [emailConfirmMsg, setEmailConfirmMsg] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');
  const [idMsg, setIdMsg] = useState('');

  const [test, setTest] = useState(0);

  useEffect(() => {
    setConfirm('');
  }, []);

  const nameHandler = (event) => {
    setName(event.target.value);
    if (name.length < 2) {
      setIsName(false);
    } else {
      setIsName(true);
    }
  };

  const nickHandler = (event) => {
    setNick(event.target.value);
  };

  const nickButtonHandler = () => {
    api
      .post('/user/nicknameCheck', {
        nickname: nick,
      })
      .then((response) => {
        setNickconfirmMsg(response.data.message);
        if (response.data.code === 1102) setIsNick(true);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sexHandler = (event) => {
    setSex(event.target.value);
    if (sex === 'N') {
      setIsSex(false);
    } else {
      setIsSex(true);
    }
  };

  const deptHandler = (event) => {
    setDept(event.target.value);
    if (dept === 'N') {
      setIsDept(false);
    } else {
      setIsDept(true);
    }
  };

  const idHandler = (event) => {
    setId(() => {
      if (event.target.value.length === 9) {
        console.log(event.target.value);
        setIdMsg('');
        setIsId(true);
      } else {
        setIdMsg('학번은 9자리로 입력해주십시오');
        setIsId(false);
      }
      return event.target.value;
    });
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const emailButtonHandle = () => {
    let url = 'localhost:3001/user/email';
    let regex = new RegExp('[a-z0-9]+@ajou.ac.kr');

    if (regex.test(email) === false) {
      setEmailMsg('아주대학교 이메일 형식으로 입력해주세요.');
      return;
    } else {
      api
        .post('/user/email', {
          email: email,
        })
        .then((response) => {
          //성공시 code:1000 msg="성공"
          //실패시 code:2003 msg= "이미존재"
          console.log(response.data);
          if (response.data.code === 1000) {
            setEmailMsg('인증번호를 입력해주세요');
            setEmailCode(response.data.result);
          } else {
            setEmailMsg('이미 존재하는 이메일 계정입니다');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const emailConfirmHandler = (event) => {
    setTypeCode(event.target.value);
  };

  const confirmButtonHandle = (event) => {
    if (emailCode === undefined) {
      setEmailConfirmMsg('이메일 인증을 먼저 해주시기 바랍니다');
      return;
    }
    if (emailCode === Number(typeCode)) {
      setIsEmailConfirm(true);
      setEmailConfirmMsg('인증이 완료되었습니다');
    } else {
      setIsEmailConfirm(false);
      setEmailConfirmMsg('인증번호가 다릅니다');
    }
  };

  const pwdHandler = (event) => {
    const reg = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;

    setPwd(() => {
      if (!reg.test(event.target.value)) {
        setPwdMsg('8자 이상 영문자, 숫자, 특수문자를 사용하세요');
        setIsPwd(false);
      } else {
        setPwdMsg('훌룡한 비밀번호입니다');
        setIsPwd(true);
      }
      return event.target.value;
    });
  };

  const pwdConfirmHandler = (event) => {
    setConfirm(() => {
      if (event.target.value.length < 2) {
        setConfirm('다시 한번 비밀번호를 입력하세요');
        setIsPwdConfirm(false);
      } else {
        console.log(pwd);
        if (event.target.value === pwd) {
          console.log('in');
          setPwdConfirmMsg('설정하신 비밀번호와 일치합니다.');
          setIsPwdConfirm(true);
        } else {
          setPwdConfirmMsg('설정하신 비밀번호와 일치하지 않습니다');
          setIsPwdConfirm(false);
        }
      }
      return event.target.value;
    });
  };

  const onUploadImg = (event) => {
    if (!event.target.files)
      return
    else{
      setImg(event.target.files[0])
    }
  }

  const finalButtonHandle = () => {
    if (isName && isPwd && isDept && isSex && isPwdConfirm && isId) {
      const user = new FormData();
      user.append('email', email)
      user.append('passwd', pwd)
      user.append('userName', name)
      user.append('department', dept)
      user.append('nickName', nick)
      user.append('sex', sex)
      user.append('studentId', Number(id))
      user.append('userImg', img)
      axios
        .post('http://localhost:3000/user/signUp' ,user
        ,{
          headers:{
            'Content-Type': 'multipart/form-data',
          }
        }
        )
        .then((response) => {
          console.log(response);
          // if (response.data.code === 1100) window.location.href = '/';
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('모든 정보를 기입하여주시기 바랍니다');
    }
  };

  return (
    <div>
      <div className={style.center}>
        <h1>회원가입</h1>
      </div>
      <div className={style.outter}>
        <div className={style.info}>
          <span className={style.label}>이름</span>
          <br />
          <input type="text" onChange={nameHandler} className={style.input} />
          <br></br>
        </div>
        <div className={style.info}>
          <span className={style.label}>닉네임</span>
          <br />
          <div className={style.inOutter}>
            <input className={style.inner} type="text" onChange={nickHandler} />
            <input type="button" value="중복확인" onClick={nickButtonHandler} />
            <br />
          </div>
          <span>{nickConfirmMsg}</span>
        </div>
        <div className={style.info}>
          <span className={style.label}>성별</span>
          <br />
          <select className={style.inputBox} onChange={sexHandler}>
            <option value="N">선택안함</option>
            <option value="M">남자</option>
            <option value="G">여자</option>
          </select>
          <br />
        </div>
        <div className={style.info}>
          <span className={style.label}>학과</span>
          <br />
          <select className={style.inputBox} onChange={deptHandler}>
            {data.map((data) => (
              <option value={data.value}>{data.value}</option>
            ))}
          </select>
        </div>
        <div className={style.info}>
          <span className={style.label}>학번</span>
          <br />
          <input type="text" onChange={idHandler} className={style.input} />
        </div>
        <span>{idMsg}</span>
        <br />
        <br />
        <span className={style.label}>이메일</span>
        <br />
        <div className={style.inOutter}>
          <input className={style.inner} type="text" onChange={emailHandler} />
          <input type="button" value="인증번호" onClick={emailButtonHandle} />
          <br />
        </div>
        <span>{emailMsg}</span>
        <div className={style.inOutter}>
          <input
            className={style.inner}
            type="text"
            placeholder="인증번호를 입력하세요"
            onChange={emailConfirmHandler}
          />
          <input
            className={style.inButton}
            type="button"
            value="확인"
            onClick={confirmButtonHandle}
          />
        </div>
        <span>{emailConfirmMsg}</span>
        <div className={style.info}>
          <span className={style.label}>비밀번호</span>
          <br />
          <input type="password" onChange={pwdHandler} className={style.input} />
          <br />
        </div>
        <span>{pwdMsg}</span>
        <div className={style.info}>
          <span className={style.label}>비밀번호 재확인</span>
          <br />
          <input type="password" onChange={pwdConfirmHandler} className={style.input} />
          <br />
          <span>{pwdConfirmMsg}</span>
        </div>
        <div className={style.info}>
          <span className={style.label}>프로필 사진 업로드</span><br /><br />
          <input type="file" accept='image/*' onChange={onUploadImg}/><br />
        </div>
        <div className={style.finalButton}>
          <input
            className={style.button}
            type="button"
            value="가입하기"
            onClick={finalButtonHandle}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
