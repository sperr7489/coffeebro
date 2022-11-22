import { HeaderContainer, RightChildContainer } from './index.style';
import { icAlarm, icUser, icMenu } from '@/assets/icons';

export default function Header() {
  return (
    <HeaderContainer>
      <img src={icMenu} />
      <span>커피가게아저씨</span>
      <RightChildContainer>
        <button>
          <img src={icAlarm} />
        </button>
        <button>
          <img src={icUser} />
        </button>
      </RightChildContainer>
    </HeaderContainer>
  );
}
