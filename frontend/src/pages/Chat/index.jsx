import Header from '../../components/Header';
import LoginCheck from '../Login/components/LoginCheck';
import Chatting from './components/Chatting';
import UserList from './components/UserList';
import { ChatPageContainer, ChatMainContainer } from './index.style';

export default function ChatPage() {
  return (
    <ChatPageContainer>
      <ChatMainContainer>
        <LoginCheck />
        <Chatting />
        <UserList />
      </ChatMainContainer>
    </ChatPageContainer>
  );
}
