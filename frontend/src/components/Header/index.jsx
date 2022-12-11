import { HeaderContainer, RightChildContainer } from './index.style';
import { icAlarm, icUser, icMenu } from '@/assets/icons';
import Alarm from './components/alarm';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Cookies, useCookies } from 'react-cookie';
import Menu from './components/Menu';

export default function Header() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookies] = useCookies(['id']);
  const [showMenu, setShowMenu] = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);

  const menuClick = () => {
    setShowMenu(!showMenu);
  };

  const alramClick = () => {
    setShowAlarm(!showAlarm);
  };

  const logout = () => {
    removeCookies('id');
    navigate('/');
  };

  return (
    <HeaderContainer>
      <img src={icMenu} onClick={menuClick} />
      <h2
        onClick={() => {
          navigate('/');
        }}
      >
        커피가게아저씨
      </h2>
      {showMenu ? <Menu closeModal={() => setShowMenu(false)} /> : <></>}
      {cookies.id === undefined ? (
        <input
          type="button"
          value="로그인"
          onClick={() => {
            navigate('/login');
          }}
        />
      ) : (
        <RightChildContainer>
          <button>
            <img src={icAlarm} onClick={alramClick} />
          </button>
          {showAlarm ? <Alarm /> : <></>}
          <button onClick={() => navigate('/mypage')}>
            <img src={icUser} />
          </button>
          <button onClick={logout}>로그아웃</button>
        </RightChildContainer>
      )}
    </HeaderContainer>
  );
}
