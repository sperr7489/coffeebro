import styled from "styled-components";

export const ModalBackground = styled.div`
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100px;
	height: 100px;
	display: flex;
`;
export const ApplicationModalContainer = styled.div`
	position: fixed;
	display: flex;
	flex-direction: column;
	width: 820px;
	height: 500px;
	border: 1px solid black;
	justify-content: space-between;
	align-items: center;
	/* margin-left: -10px;
	margin-top: -10px; */
	background-color: white;
	button:last-child {
		align-self: center;
		margin-bottom: 20px;
	}
`;

export const ItemListConatiner = styled.div`
	width: 780px;
	height: 350px;
	border-radius: 10px;
	border: 1px solid #c5875b;
	margin-top: 20px;
`;
export const ButtonWrapper = styled.div`
	width: 780px;
	padding: 0px 20px 0px 20px;
	display: flex;
	justify-content: space-between;
	button:first-child {
		width: 200px;
		height: 80px;
		font-size: 28px;
		border-radius: 10px;
		border: none;
		background-color: lightgray;
	}
`;
