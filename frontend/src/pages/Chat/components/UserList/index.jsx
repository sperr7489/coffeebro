import { UserListContainer, UserInfoContainer } from './index.style';

export default function UserList(props) {
  const { chatRoomInfo, setChatRoomIdx, chatRoomIdx } = props;
  const handleChatRoomClick = (idx) => {
    setChatRoomIdx(idx);
    window.history.pushState('', '', `/chat/${idx}`);
  };
  return (
    <UserListContainer>
      {chatRoomInfo.map((info, idx) => (
        <UserInfoContainer
          key={`${info.otherInfo.userName} ${idx}`}
          isSelected={info.chatRoomIdx === chatRoomIdx}
          onClick={() => handleChatRoomClick(info.chatRoomIdx)}
        >
          <div>
            <div></div>
            <span>{info.otherInfo.userName}</span>
          </div>
          <span>{info.lastChatOfOther[-1]}</span>
        </UserInfoContainer>
      ))}
    </UserListContainer>
  );
}
