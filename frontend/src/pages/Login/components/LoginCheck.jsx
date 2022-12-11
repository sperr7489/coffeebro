import React from 'react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const LoginCheck = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['id']);
  const navigate = useNavigate();

  const tokenCheck = () => {
    const token = cookies.id;

    if (token === undefined) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  };

  useEffect(() => {
    tokenCheck();
  });

  return <></>;
};

export default LoginCheck;
