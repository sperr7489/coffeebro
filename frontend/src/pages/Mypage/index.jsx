import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import LoginCheck from '../Login/components/LoginCheck';
import InfoImage from './components/InfoImage';
import { MypageContainer, UserInfoContainer } from './index.style';
import axios from 'axios';
import { api, authApi } from '../../../axios.config';
import { Cookies } from 'react-cookie';

export default function MyPage() {
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [nickname, setNickname] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const handleNicknameChange = (e) => {
    setIsChecked(false);
    setNickname(e.target.value);
  };

  const handleSubmitClick = () => {
    if (!isChecked && userInfo.nickname !== nickname) {
      alert('닉네임 중복체크를 먼저 해주세요');
      return;
    }
    const formData = new FormData();
    formData.append('userImg', file ?? '');
    formData.append('nickname', nickname);
    console.log(file);
    const cookies = new Cookies();
    axios
      .put(`http://localhost:3001/user`, formData, {
        headers: {
          'Contest-Type': 'multipart/form-data',
          accessToken: cookies.get('id'),
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  const handleCheckClick = () => {
    api
      .post(`/user/nicknameCheck`, {
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
      authApi.get(`/user/mypage`).then((res) => {
        console.log(res);
        setUserInfo(res.data.result);
        setNickname(res.data.result.nickname);
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
          <span>{userInfo?.userName}</span>
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
          {userInfo?.mostVisitedCafeNames?.map((cafeName, idx) => {
            return cafeName !== '없음' && <p key={`${cafeName} ${idx}`}>{cafeName}</p>;
          })}
        </div>
        <div>
          <span>평점: </span>
          <span>{userInfo.applicantScore} / 5</span>
        </div>
      </UserInfoContainer>
      <Button id="submit" content="저장하기" handleClick={handleSubmitClick}></Button>
    </MypageContainer>
  );
}
