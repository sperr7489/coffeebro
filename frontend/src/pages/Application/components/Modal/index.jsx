import { forwardRef, useEffect, useState } from "react";
import Button from "../../../../components/Button";
import MenuInfo from "../MenuInfo";
import { ApplicationModalContainer, ButtonWrapper, ItemListConatiner, MenuInfoListContainer, MenuInfoListTitleWrapper, MenuInfoListWrapper, ModalBackground } from "./index.style";

export default function ApplicationModal(props) {
	const { menuList, setMenuList, refs, setIsModalOpen } = props;
	const [modalIdx, setModalIdx] = useState(0);
	const [menuInfo, setMenuInfo] = useState({ cafe: "", menu: "" });
	const [menuInfoList, setMenuInfoList] = useState(menuList);
	const dummyCafeList = [
		{ imgPath: "", name: "에이바우트" },
		{ imgPath: "", name: "에이바우트" },
		{ imgPath: "", name: "에이바우트" },
		{ imgPath: "", name: "에이바우트" },
		{ imgPath: "", name: "에이바우트" },
		{ imgPath: "", name: "에이바우트" },
		{ imgPath: "", name: "에이바우트" },
		{ imgPath: "", name: "에이바우트" },
		{ imgPath: "", name: "에이바우트" },
		{ imgPath: "", name: "에이바우트" },
		{ imgPath: "", name: "에이바우트" },
		{ imgPath: "", name: "에이바우트" },
		{ imgPath: "", name: "에이바우트" },
		{ imgPath: "", name: "에이바우트" },
		{ imgPath: "", name: "에이바우트" },
		{ imgPath: "", name: "에이바우트" },
		{ imgPath: "", name: "에이바우트" },
		{ imgPath: "", name: "에이바우트" },
		{ imgPath: "", name: "에이바우트" },
	];
	const dummyMenuList = [
		{ imgPath: "", name: "아메리카노" },
		{ imgPath: "", name: "아메리카노" },
		{ imgPath: "", name: "아메리카노" },
		{ imgPath: "", name: "아메리카노" },
		{ imgPath: "", name: "아메리카노" },
		{ imgPath: "", name: "아메리카노" },
		{ imgPath: "", name: "아메리카노" },
	];
	const handleItemClick = (name) => {
		setMenuInfo((prev) => {
			const newState = { ...prev };
			newState[modalIdx === 0 ? "cafe" : "menu"] = name;
			return newState;
		});
		setModalIdx((prev) => prev + 1);
	};
	useEffect(() => {
		if (modalIdx === 2) {
			setMenuInfoList((prev) => [...prev, { ...menuInfo, num: 1, request: "" }]);
		}
	}, [modalIdx]);

	const handleMenuNum = (action, idx) => {
		const newList = [...menuInfoList];
		const newState = { ...newList[idx] };
		if (action === "minus") {
			if (newState.num === 1) {
				setMenuInfoList((prev) => newList.filter((item, index) => index !== idx));
				return;
			}
			newState.num -= 1;
			newList[idx] = newState;
			setMenuInfoList(newList);
			return;
		}
		newState.num += 1;
		newList[idx] = newState;
		setMenuInfoList(newList);
	};
	const handleChangeRequest = (e, idx) => {
		const newList = [...menuInfoList];
		const newState = { ...newList[idx] };
		newState.request = e.target.value;
		newList[idx] = newState;
		setMenuInfoList(newList);
	};
	return (
		<ModalBackground>
			<ApplicationModalContainer ref={refs}>
				<button onClick={() => setIsModalOpen(false)}>x</button>
				{modalIdx === 2 ? (
					<MenuInfo menuInfoList={menuInfoList} setMenuInfoList={setMenuInfoList} />
				) : (
					<ItemListConatiner>
						{(modalIdx === 0 ? dummyCafeList : dummyMenuList).map((item) => (
							<div onClick={() => handleItemClick(item.name)}>
								<img src={item.imaPath} />
								<span>{item.name}</span>
							</div>
						))}
					</ItemListConatiner>
				)}
				<ButtonWrapper>
					<button onClick={() => setModalIdx((prev) => (prev === 0 ? prev : prev - 1))}>뒤로가기</button>
					<Button
						handleClick={() => {
							setMenuList(menuInfoList);
							setIsModalOpen(false);
						}}
						content="등록하기"
					></Button>
				</ButtonWrapper>
			</ApplicationModalContainer>
		</ModalBackground>
	);
}
