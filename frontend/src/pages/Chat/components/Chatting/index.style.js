import styled from "styled-components";

export const ChattingConatiner = styled.div`
	width: 830px;
	border: 1px solid black;
	/* height: 600px; */
`;
export const ChatListContainer = styled.div`
	display: flex;
	flex-direction: column;
	overflow: auto;
	width: 830px;
	height: 500px;
	background-color: #49b2df;
	/* scroll-behavior: smooth; */
`;
export const ChatWrapper = styled.div`
	display: flex;
	justify-content: ${(props) => (props.isSend ? "flex-end" : "flex-start")};
	padding: 10px;
	.content {
		display: inline-block;
		background-color: ${(props) => (props.isSend ? "#D6E525" : "#D9D9D9")};
		padding: 10px;
		width: 300px;
		min-height: 30px;
		border-radius: 10px;
		margin-bottom: 20px;
	}
	.time {
		display: inline-block;
		align-self: flex-end;
		margin: 0px 10px 0px 10px;
		color: white;
		margin-bottom: 20px;
	}
	& > div {
	}
`;
export const ChatMessageSendContainer = styled.div`
	width: 830px;
	display: flex;
	& > textarea {
		width: 730px;
		height: 80px;
		resize: none;
		border-radius: 0px;
	}
	& > button {
		width: 100px;
	}
`;
