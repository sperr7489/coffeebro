import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import LoginCheck from '../Login/components/LoginCheck';
import InfoImage from './components/InfoImage';
import { MypageContainer, UserInfoContainer } from './index.style';
import axios from 'axios';

export default function MyPage() {
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [nickname, setNickname] = useState('닉네임');
  const [isChecked, setIsChecked] = useState(false);
  const [userInfo, setUserInfo] = useState({});

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
        alert(res.data.message);
        if (res.data.isSuccess) {
          setIsChecked(true);
        }
      });
  };

  useEffect(() => {
    async function getData() {
      axios
        .get(`http://localhost:3001/user/mypage`, {
          headers: {
            accessToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTY3MDE2OTQ1OSwiZXhwIjoxNjcwMjU1ODU5fQ.AgN9VdmVPda0LjbmaWUmHszwp-_GGaU0s_mlHNxwIK8',
          },
        })
        .then((res) => {
          console.log(res);
        });
    }
    getData();
  }, []);

  return (
    <MypageContainer>
      <LoginCheck />
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
