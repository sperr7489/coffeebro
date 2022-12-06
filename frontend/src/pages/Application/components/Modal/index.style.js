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

	.slide-in {
		animation-duration: 0.45s;
		animation-name: slidein;
	}

	.slide-out {
		animation-duration: 0.45s;
		animation-name: slideout;
	}

	@keyframes slidein {
		from {
			bottom: 0px;
			/* bottom: -100%; */
			/* opacity: 0; */
		}
		to {
			bottom: 116px;
			/* bottom: 0%; */
			/* opacity: 1; */
		}
	}
	@keyframes slideout {
		from {
			bottom: 116px;
			/* bottom: 0%; */
			/* opacity: 1; */
		}
		to {
			bottom: 0px;
			/* bottom: -100%; */
			/* opacity: 0; */
		}
	}
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
	height: 120px;
	background-color: white;
	padding: 0px 20px 0px 20px;
	z-index: 999;
	display: flex;
	justify-content: space-between;
	align-items: center;
	button:first-child {
		width: 200px;
		height: 80px;
		font-size: 28px;
		border-radius: 10px;
		border: none;
		background-color: lightgray;
	}
`;

export const RequestListContainer = styled.div`
	z-index: 0;
	position: absolute;
	width: 760px;
	height: 120px;
	background-color: white;
	bottom: 116px;
	padding: 10px;
	display: flex;
	flex-direction: column;
	& > div {
		display: flex;
		flex-wrap: nowrap;
		overflow-x: scroll;
	}
	& > button {
		width: 40px;
		align-self: flex-end;
	}
	border: 1px solid black;
`;

export const RequestContainer = styled.div`
	width: 80px;
	height: 80px;
	flex: 0 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	border: 1px solid black;
	margin-right: 10px;
	background-color: ${(props) => (props.isSelected ? "#c5875b" : "white")};
`;
