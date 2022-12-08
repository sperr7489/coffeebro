import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import InfoImage from './components/InfoImage';
import { MypageContainer, UserInfoContainer } from './index.style';
import axios from 'axios';

export default function MyPage() {
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [nickname, setNickname] = useState('닉네임');
  const [isChecked, setIsChecked] = useState(false);

  const handleNicknameChange = (e) => {
    setIsChecked(false);
    setNickname(e.target.value);
  };

  const handleSubmitClick = () => {
    if (!isChecked) {
      alert('닉네임 중복체크를 먼저 해주세요');
      return;
    }
  };
  const handleCheckClick = () => {
    axios
      .post(`http://localhost:3001/user/nicknameCheck`, {
        nickname: nickname,
      })
      .then((res) => {
        if (res.isSuccess) {
          alert(res.message);
          setIsChecked(true);
          return;
        }
        alert('사용중인 닉네임입니다.');
      });
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
          <button onClick={handleCheckClick} disabled={isChecked}>
            중복체크
          </button>
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
      <Button id="submit" content="저장하기" handleClick={handleSubmitClick}></Button>
    </MypageContainer>
  );
}
