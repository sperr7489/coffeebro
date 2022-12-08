import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import ApplicantCard from './components/ApplicantCard';
import MainModal from './components/Modal';
import axios from 'axios';
import { Container, MainContentContainer } from './index.style';

const dummyData = [
  {
    serviceApplicationIdx: 6,
    userIdx: 35,
    cafeIdx: 1,
    cafeName: '기창존맛커피',
    receiptTime: '2022-07-02T19:14:45.000Z',
    receiptPlace: '율곡관',
    status: 0,
    drinkInfos: [
      {
        name: '아메리카노',
        option: ['연하게', '샷추가', '사이즈업'],
      },
      {
        name: '카페라떼',
        option: ['연하게', '샷추가'],
      },
      {
        name: '카페라떼',
        option: ['연하게'],
      },
      {
        name: '카페라떼',
        option: ['연하게'],
      },
    ],
  },
];
export default function MainPage() {
  const [applicants, setApplicants] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [nowApplicant, setNowApplicant] = useState(null);
  const navigate = useNavigate();
  const openModal = (applicant) => {
    setNowApplicant(applicant);
    setIsOpen(true);
  };
  const closeModal = () => {
    setNowApplicant(null);
    setIsOpen(false);
  };
  useEffect(() => {
    async function getData() {
      // axios;
      // .post(`http://localhost:3001/user/signUp`, {
      //   email: 'xoghd5885@ajou.ac.kr',
      //   passwd: 'asd123123!@',
      //   userName: '민태홍',
      //   department: '소프트웨어학과',
      //   sex: 'M',
      //   studentId: '201720793',
      // })
      // .then((res) => console.log(res));

      // axios
      //   .post(`http://localhost:3001/user/login`, {
      //     email: 'xoghd5885@ajou.ac.kr',
      //     passwd: 'asd123123!@',
      //   })
      //   .then((res) => console.log(res));

      axios
        .get(`http://localhost:3001/user/delivery/infos`, {
          headers: {
            accessToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTY3MDQ3MDgxNiwiZXhwIjoxNjcwNTU3MjE2fQ.TjGVQRmLaA88RtnWBDFDUq6iizrKEWl4G_tgEOX7sFQ',
          },
        })
        .then((res) => console.log(res));
    }
    getData();
    setApplicants(dummyData);
  }, []);
  return (
    <Container>
      <MainContentContainer>
        {applicants.map((applicant, idx) => (
          <ApplicantCard
            key={idx}
            onClick={() => {
              openModal(applicant);
            }}
            {...applicant}
          />
        ))}
        {isOpen && <MainModal {...nowApplicant} closeModal={() => closeModal()} />}
      </MainContentContainer>
      <Button content="배달 신청" handleClick={() => navigate('/application')} />
    </Container>
  );
}
