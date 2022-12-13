import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { authApi } from '../../../../../axios.config';
import ClientSocket from '../../../../hooks/useSocket';
import useSocket from '../../../../hooks/useSocket';
import {
  ChatListContainer,
  ChattingConatiner,
  ChatWrapper,
  ChatMessageSendContainer,
} from './index.style';

export default function Chatting(props) {
  const { chatRoomInfo, chatRoomIdx, setChatRoomInfo } = props;
  const [chatInfo, setChatInfo] = useState([]);
  const scrollRef = useRef();
  const messageRef = useRef();
  const getChatMessage = (data) => {
    // console.log(2);
    const date = new Date(data.createdAt);
    const hour = date.getHours();
    const minute = date.getMinutes();
    console.log(chatRoomIdx);
    setChatInfo((prev) => [
      ...prev,
      {
        ...data,
        isSend:
          chatRoomInfo.find((info) => info.chatRoomIdx === chatRoomIdx)?.ownUserIdx ===
          data.fromIdx,
        createdAt: `${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}`,
      },
    ]);
    setChatRoomInfo((prev) => {
      console.log(prev);
      const newState = [...prev].filter((info) => info.chatRoomIdx !== chatRoomIdx);
      const chatInfo = [...prev].find((info) => info.chatRoomIdx === chatRoomIdx);
      return [{ ...chatInfo, lastChatOfOther: [data] }, ...newState];
    });
  };
  const clientSocket = new ClientSocket({ chatRoomIdx, getChatMessage });
  // const [sendMessage, connectSocket, disconnectSocket] = useSocket({
  //   chatRoomInfo,
  //   getChatMessage,
  // });

  const scrollToBottom = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatInfo, chatRoomIdx]);
  useEffect(() => {
    clientSocket.connect();
    clientSocket.addEvent();
    async function getData() {
      if (chatRoomIdx === 0) {
        return;
      }
      authApi.get(`/chat/${chatRoomIdx}`).then((res) => {
        if (!res.data.isSuccess) {
          window.location.assign('/chat');
          return;
        }
        setChatInfo(
          res.data.result.chats.map((chat) => {
            const date = new Date(chat.createdAt);
            const hour = date.getHours();
            const minute = date.getMinutes();
            return {
              ...chat,
              isSend:
                chatRoomInfo.find((info) => info.chatRoomIdx === chatRoomIdx).ownUserIdx ===
                chat.fromIdx,
              createdAt: `${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}`,
            };
          }),
        );
      });
    }
    getData();
    return () => {
      clientSocket.deleteEvent();
      clientSocket.disconnect();
    };
  }, [chatRoomIdx]);

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      // console.log(1);
      handleChatSend();
      return;
    }
  };
  const handleChatSend = () => {
    const message = messageRef.current.value;
    const info = chatRoomInfo.find((info) => info.chatRoomIdx === chatRoomIdx);
    console.log(message.length, message === '');
    if (!info || message.replace(/\n/g, '').replace(/\s*/g, '') === '') {
      messageRef.current.value = '';
      return;
    }
    messageRef.current.value = '';
    clientSocket.sendMessage({
      chatRoomIdx: info.chatRoomIdx,
      fromIdx: info.ownUserIdx,
      toIdx: info.otherIdx,
      message: message,
    });
  };
  return (
    <ChattingConatiner>
      <span>
        {chatRoomInfo.find((info) => info.chatRoomIdx === chatRoomIdx)?.otherInfo.userName}
      </span>
      <ChatListContainer ref={scrollRef}>
        {chatInfo.map((chat, idx) => (
          <ChatWrapper isSend={chat.isSend} key={`${chat.message} ${idx}`}>
            {chat.isSend && <span className="time">{chat.createdAt}</span>}
            <span className="content">{chat.message}</span>
            {!chat.isSend && <span className="time">{chat.createdAt}</span>}
          </ChatWrapper>
        ))}
      </ChatListContainer>
      <ChatMessageSendContainer>
        <textarea onKeyUp={handleKeyUp} ref={messageRef} />
        <button onClick={handleChatSend}>전송</button>
      </ChatMessageSendContainer>
    </ChattingConatiner>
  );
}
