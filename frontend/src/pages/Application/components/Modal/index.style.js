import styled from "styled-components";

export const ModalBackground = styled.div`
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	display: flex;
`;
export const ApplicationModalContainer = styled.div`
	position: fixed;
	display: flex;
	flex-direction: column;
	width: 820px;
	height: 500px;
	left: calc(50% - 410px);
	top: calc(50% - 250px);
	border: 1px solid black;
	justify-content: space-between;
	align-items: center;
	/* margin-left: -10px;
	margin-top: -10px; */
	background-color: white;
`;

export const ItemListConatiner = styled.div`
	width: 780px;
	height: 350px;
	border-radius: 10px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-content: flex-start;
	border: 1px solid #c5875b;
	overflow: auto;
	margin-top: 20px;
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 180px;
		height: 120px;
		img {
			width: 60px;
			height: 60px;
			border-radius: 10px;
		}
	}
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
	button:last-child {
		align-self: center;
		margin-bottom: 20px;
	}
`;
