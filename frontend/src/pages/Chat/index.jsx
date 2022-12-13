import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { authApi } from '../../../axios.config';
import LoginCheck from '../Login/components/LoginCheck';
import Chatting from './components/Chatting';
import UserList from './components/UserList';
import { ChatPageContainer, ChatMainContainer } from './index.style';

export default function ChatPage() {
  const [chatRoomInfo, setChatRoomInfo] = useState([]);
  const [chatRoomIdx, setChatRoomIdx] = useState(0);
  const params = useParams();

  useEffect(() => {
    async function getChatData() {
      authApi.get(`/chat/rooms`).then((res) => {
        setChatRoomInfo(res.data.result);
        if (params.chatRoomIdx) {
          setChatRoomIdx(Number(params.chatRoomIdx));
        }
      });
    }
    getChatData();
  }, []);
  return (
    <ChatPageContainer>
      <LoginCheck />
      <ChatMainContainer>
        <Chatting
          chatRoomIdx={chatRoomIdx}
          chatRoomInfo={chatRoomInfo}
          setChatRoomInfo={setChatRoomInfo}
        />
        <UserList
          chatRoomInfo={chatRoomInfo}
          setChatRoomIdx={setChatRoomIdx}
          chatRoomIdx={chatRoomIdx}
        />
      </ChatMainContainer>
    </ChatPageContainer>
  );
}
