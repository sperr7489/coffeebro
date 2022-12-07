import { forwardRef, useEffect, useState } from "react";
import Button from "../../../../components/Button";
import MenuInfo from "../MenuInfo";
import { ApplicationModalContainer, ButtonWrapper, ItemListConatiner, ModalBackground, RequestContainer, RequestListContainer } from "./index.style";

const dummyCafeList = [
	{
		cafeIdx: 1,
		cafeName: "기창존맛커피",
		cafeImg: null,
	},
	{
		cafeIdx: 2,
		cafeName: "태홍노맛커피",
		cafeImg: null,
	},
	{
		cafeIdx: 3,
		cafeName: "재연비싸커피",
		cafeImg: null,
	},
	{
		cafeIdx: 4,
		cafeName: "영민다방커피",
		cafeImg: null,
	},
];
const dummyMenuList = [
	{
		cafeIdx: 1,
		cafeName: "기창존맛커피",
		drinkIdx: 1,
		drinkName: "아메리카노",
		drinkPrice: 2000,
		drinkImage: "https://littledeep.com/wp-content/uploads/2019/04/littledeep_illustration_coffee_png1.png",
	},
	{
		cafeIdx: 1,
		cafeName: "기창존맛커피",
		drinkIdx: 2,
		drinkName: "카페라떼",
		drinkPrice: 2500,
		drinkImage: "https://littledeep.com/wp-content/uploads/2019/04/littledeep_illustration_coffee_png1.png",
	},
	{
		cafeIdx: 1,
		cafeName: "기창존맛커피",
		drinkIdx: 3,
		drinkName: "카라멜마끼야또",
		drinkPrice: 6500,
		drinkImage: "https://littledeep.com/wp-content/uploads/2019/04/littledeep_illustration_coffee_png1.png",
	},
];

const dummyRequestList = ["연하게", "샷추가", "시럽추가", "짜게", "맛있게"];
export default function ApplicationModal(props) {
	const { menuList, setMenuList, refs, setIsModalOpen } = props;
	const [modalIdx, setModalIdx] = useState(0);
	const [menuInfo, setMenuInfo] = useState({ cafe: {}, menu: {} });
	const [requestList, setRequestList] = useState([]);
	const [menuInfoList, setMenuInfoList] = useState(menuList);
	const [animationName, setAnimationName] = useState("slide-in");
	const [isRequestOpen, setIsRequestOpen] = useState(false);

	const handleItemClick = (item) => {
		setMenuInfo((prev) => {
			const newState = { ...prev };
			newState[modalIdx === 0 ? "cafe" : "menu"] = item;
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
		if (modalIdx === 2) {
			setMenuInfoList((prev) => [...prev, { ...menuInfo, num: 1, request: requestList.join(", ") }]);
			return;
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
							<div onClick={() => handleItemClick(item)} key={`${item.cafeName} ${idx}`}>
								<img src={item.imaPath} />
								<span>{item[modalIdx === 0 ? "cafeName" : "drinkName"]}</span>
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
