import React from 'react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate
 } from 'react-router-dom';

const LoginCheck = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['id']);
    const navigate = useNavigate();

    const tokenCheck = () => {
        const token = cookies.id;

        if(token === undefined){
            alert("접근 권한이 없습니다.")
            navigate("/")
        }
    }

    useEffect(() => {
        tokenCheck()
    })

    return (
        <>
        </>
    );
};

export default LoginCheck;