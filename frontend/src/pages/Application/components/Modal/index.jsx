import { useState } from "react";
import Button from "../../../../components/Button";
import { ApplicationModalContainer, ButtonWrapper, ItemListConatiner, ModalBackground } from "./index.style";

export default function ApplicationModal() {
	const [modalIdx, setModalIdx] = useState(0);
	const [menuInfo, setMenuInfo] = useState({ cafe: "", menu: "", request: "" });
	return (
		<ModalBackground>
			<ApplicationModalContainer>
				<ItemListConatiner></ItemListConatiner>
				<ButtonWrapper>
					<button>뒤로가기</button>
					<Button handleClick={() => {}} content="등록하기"></Button>
				</ButtonWrapper>
			</ApplicationModalContainer>
		</ModalBackground>
	);
}
