import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Header from "../../components/Header";
import ApplicantCard from "./components/ApplicantCard";
import MainModal from "./components/Modal";
import { Container, MainContentContainer } from "./index.style";

const dummyData = [
	{
		imgPath: "",
		cafeName: "굳커피",
		arriveLocation: "팔달관 305호",
		arriveAt: "11시30분",
		menu: "아이스아메리카노",
		grade: "4.5/5",
	},
	{
		imgPath: "",
		cafeName: "굳커피",
		arriveLocation: "팔달관 305호",
		arriveAt: "11시30분",
		menu: "아이스아메리카노",
		grade: "4.5/5",
	},
	{
		imgPath: "",
		cafeName: "굳커피",
		arriveLocation: "팔달관 305호",
		arriveAt: "11시30분",
		menu: "아이스아메리카노",
		grade: "4.5/5",
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
			<Button content="배달 신청" handleClick={() => navigate("/application")} />
		</Container>
	);
}
