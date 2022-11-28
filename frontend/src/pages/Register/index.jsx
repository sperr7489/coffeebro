import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { data } from './data';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import style from './index.module.css'

const Register = () => {
    const [name, setName] = useState("")
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

    const [pwdConfirmMsg, setPwdConfirmMsg] = useState("")

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
        if(dept === 'N'){
            setIsDept(false)
        }
        else{
            setIsDept(true)
        }
    }

    const idHandler = (event) => {
        setId(event.target.value)
       
        if(id.length < 8 || id.length > 8)
            setIsId(false)
        else
            setIsId(true)
    }

    const emailHandler = (event) => {
        setEmail(event.target.value)
    }

    const emailButtonHandle = () => {
        let url = "localhost:3000/user/email"
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')

        if(regex.test(email) === false){
            alert("정확한 이메일 형식을 입력해주세요")
            return
        }
        else{
            axios.post(url, {
                "email": email
            })
            .then(response => {
                setEmailCode(response.result)
            })
            .catch(error => {
                console.log("api error")
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
        if(emailCode === Number(typeCode))
            setIsEmailConfirm(true)
        else
            setIsEmailConfirm(false)
    }

    const pwdHandler = (event) => {
        setPwd(event.target.value)
        if(pwd.length < 2)
            setIsPwd(false)
        else
            setIsPwd(true)
    }

    const pwdConfirmHandler = (event) => {
        console.log("in")
        setConfirm(event.target.value)
        console.log(confirm)
        if(pwd !== confirm){
            setPwdConfirmMsg("입력하신 비밀번호와 동일하게 입력해주십시오")
            setIsPwdConfirm(false)
        }
        else{
            setPwdConfirmMsg("입력하신 비밀번호와 동일합니다")
            setIsPwdConfirm(true)
        }
    }

    const finalButtonHandle = () => {
        if(isName && isEmailConfirm && isPwd && isDept && isSex && isPwdConfirm && isId)
            Navigate("/")
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
                </div>
                <div className={style.inOutter}>
                    <input className={style.inner} type="text" placeholder='인증번호를 입력하세요'onChange={emailConfirmHandler}/>
                    <input className={style.inButton} type="button" value="확인" onClick={confirmButtonHandle}/>
                </div>
                <div className={style.info}>
                    <span className={style.label}>비밀번호</span><br />
                    <input type="password" onChange={pwdHandler} className={style.input}/><br />
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