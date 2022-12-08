import { UserListContainer, UserInfoContainer } from './index.style';

const dummyUserData = [
  {
    userName: '아이언맨',
    message: '안녕하세요플레ddddddd안녕하세요플레ddddddd안녕하세요플레ddddddd안녕하세요플레ddddddd',
  },
  { userName: '아이언맨', message: '안녕하세요플레' },
  { userName: '아이언맨', message: '안녕하세요플레' },
  { userName: '아이언맨', message: '안녕하세요플레' },
  { userName: '아이언맨', message: '안녕하세요플레' },
  { userName: '아이언맨', message: '안녕하세요플레' },
];
export default function UserList() {
  return (
    <UserListContainer>
      {dummyUserData.map((user, idx) => (
        <UserInfoContainer key={`${user.userName} ${idx}`}>
          <div>
            <div></div>
            <span>{user.userName}</span>
          </div>
          <span>{user.message}</span>
        </UserInfoContainer>
      ))}
    </UserListContainer>
  );
}
