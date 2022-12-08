import { HeaderContainer, RightChildContainer } from './index.style';
import { icAlarm, icUser, icMenu } from '@/assets/icons';
import Alarm from './components/alarm';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const buttonClick = () => {
    setShow(!show);
  };
  return (
    <HeaderContainer>
      <img src={icMenu} />
      <span>커피가게아저씨</span>
      <RightChildContainer>
        <button onClick={buttonClick}>
          <img src={icAlarm} />
          {show ? <Alarm /> : <></>}
        </button>
        <button onClick={() => navigate('/mypage')}>
          <img src={icUser} />
        </button>
      </RightChildContainer>
    </HeaderContainer>
  );
}
