import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { data } from './data';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import style from './index.module.css'

const Register = () => {
    const [name, setName] = useState("")
    // const [nick, setNick] = useState("")
    const [email, setEmail] = useState("")
    const [emailCode, setEmailCode] = useState()
    const [typeCode, setTypeCode] = useState("")
    const [pwd, setPwd] = useState("")
    const [confirm, setConfirm] = useState("")
    const [dept, setDept] = useState("")
    const [sex, setSex] = useState("")
    const [id, setId] = useState("")

    const [isName, setIsName] = useState(false)//가입하기 버튼 클릭할 때 검증
    const [isEmailConfirm, setIsEmailConfirm] = useState(false)//가입하기 버튼 클릭할 때 검증
    const [isPwd, setIsPwd] = useState(false)//
    const [isDept, setIsDept] = useState(false)//가입하기 버튼 클릭할 때 검증
    const [isSex, setIsSex] = useState(false)//가입하기 버튼 클릭할 때 검증
    const [isPwdConfirm, setIsPwdConfirm] = useState(false)//가입하기 버튼 클릭할 때 검증
    const [isId, setIsId] = useState(false)//가입하기 버튼 클릭할 때 검증

    const [pwdConfirmMsg, setPwdConfirmMsg] = useState("")//비밀번호 재입력 메시지
    const [pwdMsg, setPwdMsg] = useState("")//비밀번호 메시지
    const [emailMsg, setEmailMsg] = useState("")//이메일 검증 메시지
    const [codeMsg, setCodeMsg] = useState("")//인증번호 검증 메시지

    const [test, setTest] = useState(0)

    useEffect(() => {
        setConfirm("")
    }, [])

    const nameHandler = (event) => {
        setName(event.target.value)
        if(name.length < 2){
            setIsName(false)
        }
        else{
            setIsName(true)
        }
    }

    const sexHandler = (event) => {
        setSex(event.target.value)
        if(sex === 'N'){
            setIsSex(false)
        }
        else{
            setIsSex(true)
        }
    }

    const deptHandler = (event) => {
        setDept(event.target.value)
        if(dept === '선택안함'){
            setIsDept(false)
        }
        else{
            setIsDept(true)
        }
    }

    const idHandler = (event) => {
        setId((prev) => {
            prev = event.target.value
            
            setId(prev)
            if(prev.length === 9)
                setIsId(true)
            else
                setIsId(false)
        })
    }

    const emailHandler = (event) => {
        setEmail(event.target.value)
    }

    const emailButtonHandle = () => {
        let regex = new RegExp('[a-z0-9]+@ajou.ac.kr');

        if(regex.test(email) === false){
            alert("아주대학교 이메일 형식으로 입력해주세요")
            return
        }
        else{
            axios.post("http://localhost:3000/user/email", {
                "email": email
            })
            .then(response => {
                if(response.data.code === 2003){
                    setEmailMsg(response.data.message)
                }
                else{
                    setEmailCode(response.data.result)
                    setEmailMsg("인증번호를 입력해주세요")
                }
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    const emailConfirmHandler = (event) => {
        setTypeCode(event.target.value)
    }

    const confirmButtonHandle = (event) => {
        if(emailCode === undefined){
            alert("이메일 인증을 먼저 해주십시오")
            return
        }
        if(emailCode === Number(typeCode)){
            setCodeMsg("인증완료!")
            setIsEmailConfirm(true)
        }
        else{
            setCodeMsg("발급된 인증번호와 다릅니다.")
            setIsEmailConfirm(false)
        }
    }

    const pwdHandler = (event) => {
        const reg = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;

        setPwd((prev) => {
            prev = event.target.value;

            if(!reg.test(prev)){
                setPwdMsg("8자 이상 영문자, 숫자, 특수문자를 사용하세요")
                setIsPwd(false)
            }
            else{
                setPwdMsg("훌룡한 비밀번호입니다")
                setIsPwd(true)
            }
            return prev
        })
    }

    const pwdConfirmHandler = (event) => {

        setConfirm((prev) => {
            prev = event.target.value;
            console.log(prev)
            if(prev.length < 2){
                setConfirm("다시 한번 비밀번호를 입력하세요")
                setIsPwdConfirm(false)
            }
            else{
                console.log(pwd)
                if(prev === pwd){
                    console.log("in")
                    setPwdConfirmMsg("설정하신 비밀번호와 일치합니다.");
                    setIsPwdConfirm(true)
                }
                else{
                    setPwdConfirmMsg("설정하신 비밀번호와 일치하지 않습니다");
                    setIsPwdConfirm(false)
                }
            }
            return prev;
        })
    }

    const finalButtonHandle = () => {
        if(isName && isPwd && isDept && isSex && isPwdConfirm && isId){
            axios.post('http://localhost:3000/user/signUp', {
                "email": email,
                "passwd": pwd,
                "userName": name,
                "department": dept,
                "sex": sex,
                "studentId": Number(id)
            })
            .then(response => {
                window.location.href = '/'
            })
            .catch(error => {
                console.log(error)
            })
        }
        else
            return
    }

    return (
        <div>
            <Header />
             <div>
                <h1>회원가입</h1>
            </div>
            <div className={style.outter}>
                <div className={style.info}>
                    <span className={style.label}>이름</span><br />
                    <input type="text" onChange={nameHandler} className={style.input}/><br></br>
                </div>
                <div className={style.info}>
                    <span className={style.label}>성별</span><br />
                    <select onChange={sexHandler}>
                        <option value="N">선택안함</option>
                        <option value="M">남자</option>
                        <option value="G">여자</option>
                    </select><br />
                </div>
                <div className={style.info}>
                    <span className={style.label}>학과</span><br />
                    <select onChange={deptHandler}>
                        {
                            data.map((data) => (
                                <option value={data.value}>{data.value}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={style.info}> 
                    <span className={style.label}>학번</span><br />
                    <input type="text" onChange={idHandler} className={style.input}/>
                </div>
                <span className={style.label}>이메일</span><br />
                <div className={style.inOutter}>
                    <input className={style.inner} type="text" onChange={emailHandler}/>
                    <input type="button" value="인증번호" onClick={emailButtonHandle}/><br />
                    <span>{emailMsg}</span>
                </div>
                <div className={style.inOutter}>
                    <input className={style.inner} type="text" placeholder='인증번호를 입력하세요'onChange={emailConfirmHandler}/>
                    <input className={style.inButton} type="button" value="확인" onClick={confirmButtonHandle}/>
                    <span>{codeMsg}</span>
                </div>
                <div className={style.info}>
                    <span className={style.label}>비밀번호</span><br />
                    <input type="password" onChange={pwdHandler} className={style.input}/><br />
                    <span>{pwdMsg}</span>
                </div>
                <div className={style.info}>
                    <span className={style.label}>비밀번호 재확인</span><br />
                    <input type="password" onChange={pwdConfirmHandler} className={style.input}/><br />
                    <span>{pwdConfirmMsg}</span>
                </div>
                <div className={style.finalButton}>
                    <input className={style.button} type="button" value="가입하기" onClick={finalButtonHandle}/>
                </div>
            </div>
        </div>
    );
};

export default Register;