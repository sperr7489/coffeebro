import { HeaderContainer, RightChildContainer } from './index.style';
import { icAlarm, icUser, icMenu } from '@/assets/icons';
import Alarm from './components/alarm';
import { useState } from 'react';

export default function Header() {
  const [show, setShow] = useState(false)

  const buttonClick = () => {
    setShow(!show)
  }

  return (
    <HeaderContainer>
      <img src={icMenu} />
      <span>커피가게아저씨</span>
      <RightChildContainer>
        <button onClick={buttonClick}>
          <img src={icAlarm} />
          {show ? <Alarm /> : <></>}
        </button>
        <button>
          <img src={icUser} />
        </button>
      </RightChildContainer>
    </HeaderContainer>
  );
}
