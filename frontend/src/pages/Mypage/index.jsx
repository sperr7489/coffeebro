import { useState } from 'react';
import Button from '../../components/Button';
import InfoImage from './components/InfoImage';
import { MypageContainer, UserInfoContainer } from './index.style';

export default function MyPage() {
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [nickname, setNickname] = useState('닉네임');
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };
  return (
    <MypageContainer>
      <InfoImage image={image} setImage={setImage} file={file} setFile={setFile}></InfoImage>
      <UserInfoContainer>
        <div>
          <b>이름: </b>
          <span>이름이다</span>
        </div>
        <div>
          <b>닉네임: </b>
          <input defaultValue={nickname} onChange={handleNicknameChange} />
        </div>
        <div>
          <b>자주가는카페</b>
          <br />
          <span>dd</span>
        </div>
        <div>
          <span>평점: </span>
          <span>4.5 / 5</span>
        </div>
      </UserInfoContainer>
      <Button content="저장하기" handleClick={() => {}}></Button>
    </MypageContainer>
  );
}
