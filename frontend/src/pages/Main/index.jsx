import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import ApplicantCard from './components/ApplicantCard';
import MainModal from './components/Modal';
import axios from 'axios';
import { Container, MainContentContainer } from './index.style';
import { authApi } from '../../../axios.config';

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
      authApi.get(`/user/delivery/infos/all`).then((res) => {
        setApplicants(res.data.result);
        console.log(res.data.result);
      });
    }
    getData();
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
