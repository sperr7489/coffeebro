import { UserListContainer, UserInfoContainer } from './index.style';
import userImage from '../../../../assets/images/img_user.png';

export default function UserList(props) {
  const { chatRoomInfo, setChatRoomIdx, chatRoomIdx } = props;
  console.log(chatRoomInfo);
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
            <div>
              <img src={!!info.otherInfo.userImg ? info.otherInfo.userImg : userImage} />
            </div>
            <span>{info.otherInfo.userName}</span>
          </div>
          <span>{info.lastChatOfOther.slice(-1)[0]?.message}</span>
        </UserInfoContainer>
      ))}
    </UserListContainer>
  );
}
