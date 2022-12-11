import { useEffect } from 'react';
import { io } from 'socket.io-client';
export default function useSocket(props) {
  const { chatRoomInfo, getChatMessage, setMessage } = props;
  const socket = io('http://localhost:3001/chat', {
    cors: {
      origin: '*',
    },
    path: '/socket.io',
  });
  useEffect(() => {
    if (socket) {
      return;
    }
    socket.connect();
    const roomList = chatRoomInfo.map((info) => info.chatRoomIdx);
    socket.emit('JOIN_CHATROOM', roomList);
  }, []);

  socket.on('send_message', (data) => {
    getChatMessage(data);
  });
  const sendMessage = (chatInfo) => {
    socket.emit('send_message', chatInfo);
  };

  return [sendMessage];
}
