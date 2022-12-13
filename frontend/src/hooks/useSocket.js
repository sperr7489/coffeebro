import { useEffect } from 'react';
import { io } from 'socket.io-client';
export default class ClientSocket {
  constructor(props) {
    const { chatRoomIdx, getChatMessage } = props;
    this.connect(chatRoomIdx);
    this.getChatMessage = getChatMessage;
  }
  connect(chatRoomIdx) {
    if (this.socket) {
      return;
    }
    this.socket = io(`http://52.79.141.59:3001/chat`, {
      cors: {
        origin: '*',
      },
      path: '/socket.io',
    });
    this.socket.emit('join_chatRoom', chatRoomIdx);
  }
  disconnect() {
    if (this.socket == null || this.socket.connected === false) {
      return;
    }
    this.socket.disconnect();
    this.socket = null;
  }
  addEvent() {
    this.socket.on('send_message', (data) => {
      console.log(this.getChatMessage);
      this.getChatMessage(data);
    });
  }
  deleteEvent() {
    this.socket.off('send_message', (data) => {
      console.log(this.getChatMessage);
      this.getChatMessage(data);
    });
  }
  sendMessage(chatInfo) {
    this.socket.emit('send_message', chatInfo);
  }
}
