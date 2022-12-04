import { forwardRef, useEffect, useState } from "react";
import Button from "../../../../components/Button";
import MenuInfo from "../MenuInfo";
import { ApplicationModalContainer, ButtonWrapper, ItemListConatiner, ModalBackground, RequestContainer, RequestListContainer } from "./index.style";

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
	{ imgPath: "", name: "아메리카노" },
	{ imgPath: "", name: "아메리카노" },
	{ imgPath: "", name: "아메리카노" },
	{ imgPath: "", name: "아메리카노" },
	{ imgPath: "", name: "아메리카노" },
	{ imgPath: "", name: "아메리카노" },
	{ imgPath: "", name: "아메리카노" },
	{ imgPath: "", name: "아메리카노" },
	{ imgPath: "", name: "아메리카노" },
	{ imgPath: "", name: "아메리카노" },
	{ imgPath: "", name: "아메리카노" },
	{ imgPath: "", name: "아메리카노" },
	{ imgPath: "", name: "아메리카노" },
	{ imgPath: "", name: "아메리카노" },
	{ imgPath: "", name: "아메리카노" },
	{ imgPath: "", name: "아메리카노" },
	{ imgPath: "", name: "아메리카노" },
	{ imgPath: "", name: "아메리카노" },
	{ imgPath: "", name: "아메리카노" },
	{ imgPath: "", name: "아메리카노" },
	{ imgPath: "", name: "아메리카노" },
];

const dummyRequestList = ["연하게", "샷추가", "시럽추가", "짜게", "맛있게"];
export default function ApplicationModal(props) {
	const { menuList, setMenuList, refs, setIsModalOpen } = props;
	const [modalIdx, setModalIdx] = useState(0);
	const [menuInfo, setMenuInfo] = useState({ cafe: "", menu: "" });
	const [requestList, setRequestList] = useState([]);
	const [menuInfoList, setMenuInfoList] = useState(menuList);
	const [animationName, setAnimationName] = useState("slide-in");
	const [isRequestOpen, setIsRequestOpen] = useState(false);

	const handleItemClick = (name) => {
		setMenuInfo((prev) => {
			const newState = { ...prev };
			newState[modalIdx === 0 ? "cafe" : "menu"] = name;
			return newState;
		});
		if (modalIdx === 1) {
			setIsRequestOpen(true);
			return;
		}
		setModalIdx((prev) => prev + 1);
	};

	const removeRequestModal = () => {
		if (!isRequestOpen) {
			return;
		}
		setAnimationName("slide-out");
		setTimeout(() => {
			setIsRequestOpen(false);
			setAnimationName("slide-in");
		}, 450);
	};

	const handleRequestClick = (request) => {
		if (requestList.includes(request)) {
			setRequestList((prev) => prev.filter((req) => req !== request));
			return;
		}
		setRequestList((prev) => [...prev, request]);
	};

	useEffect(() => {
		setIsRequestOpen(false);
		setRequestList([]);
	}, [modalIdx]);

	useEffect(() => {
		if (modalIdx === 2) {
			setMenuInfoList((prev) => [...prev, { ...menuInfo, num: 1, request: requestList.join(", ") }]);
		}
	}, [modalIdx]);

	return (
		<ModalBackground>
			<ApplicationModalContainer ref={refs}>
				<button onClick={() => setIsModalOpen(false)}>x</button>
				{modalIdx === 2 ? (
					<MenuInfo menuInfoList={menuInfoList} setMenuInfoList={setMenuInfoList} />
				) : (
					<ItemListConatiner onScroll={removeRequestModal}>
						{(modalIdx === 0 ? dummyCafeList : dummyMenuList).map((item, idx) => (
							<div onClick={() => handleItemClick(item.name)} key={`${item.name} ${idx}`}>
								<img src={item.imaPath} />
								<span>{item.name}</span>
							</div>
						))}
					</ItemListConatiner>
				)}
				{isRequestOpen && (
					<RequestListContainer className={animationName}>
						<button>aa</button>
						<div>
							{dummyRequestList.map((request, idx) => (
								<RequestContainer
									key={`${request} ${idx}`}
									onClick={() => {
										handleRequestClick(request);
									}}
									isSelected={requestList.includes(request)}
								>
									<span>{request}</span>
								</RequestContainer>
							))}
						</div>
					</RequestListContainer>
				)}
				<ButtonWrapper>
					{modalIdx === 2 ? <button onClick={() => setModalIdx(0)}>메뉴 추가하기</button> : <button onClick={() => setModalIdx((prev) => (prev === 0 ? prev : prev - 1))}>뒤로가기</button>}
					{isRequestOpen ? (
						<Button
							handleClick={() => {
								setModalIdx((prev) => prev + 1);
							}}
							content="다음으로"
						></Button>
					) : (
						<Button
							handleClick={() => {
								setMenuList(menuInfoList);
								setIsModalOpen(false);
							}}
							content="등록하기"
						></Button>
					)}
				</ButtonWrapper>
			</ApplicationModalContainer>
		</ModalBackground>
	);
}
