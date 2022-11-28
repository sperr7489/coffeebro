import { useEffect, useRef } from "react";
import { ChatListContainer, ChattingConatiner, ChatWrapper, ChatMessageSendContainer } from "./index.style";

const dummyChatList = [
	{ message: "안녕", time: "22.11.28", isSend: true },
	{ message: "ㅎㅇ", time: "22.11.28", isSend: false },
	{ message: "ㅎㅇ", time: "22.11.28", isSend: false },
	{ message: "안녕", time: "22.11.28", isSend: true },
	{ message: "안녕", time: "22.11.28", isSend: true },
	{ message: "ㅎㅇ", time: "22.11.28", isSend: false },
	{ message: "ㅎㅇ", time: "22.11.28", isSend: false },
	{ message: "안녕", time: "22.11.28", isSend: true },
	{ message: "안녕", time: "22.11.28", isSend: true },
	{ message: "ㅎㅇ", time: "22.11.28", isSend: false },
	{ message: "ㅎㅇ", time: "22.11.28", isSend: false },
	{ message: "안녕", time: "22.11.28", isSend: true },
	{ message: "안녕", time: "22.11.28", isSend: true },
	{ message: "ㅎㅇ", time: "22.11.28", isSend: false },
	{ message: "ㅎㅇ", time: "22.11.28", isSend: false },
	{ message: "안녕", time: "22.11.28", isSend: true },
	{ message: "안녕", time: "22.11.28", isSend: true },
	{ message: "ㅎㅇ", time: "22.11.28", isSend: false },
	{ message: "ㅎㅇ", time: "22.11.28", isSend: false },
	{ message: "안녕", time: "22.11.28", isSend: true },
];
export default function Chatting(props) {
	const { user } = props;
	const scrollRef = useRef();
	const scrollToBotton = () => {
		scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
	};
	useEffect(() => {
		scrollToBotton();
	}, []);
	return (
		<ChattingConatiner>
			<span>유저이름</span>
			<ChatListContainer ref={scrollRef}>
				{dummyChatList.map((chat, idx) => (
					<ChatWrapper isSend={chat.isSend} key={`${chat.message} ${idx}`}>
						{chat.isSend && <span className="time">{chat.time}</span>}
						<span className="content">{chat.message}</span>
						{!chat.isSend && <span className="time">{chat.time}</span>}
					</ChatWrapper>
				))}
			</ChatListContainer>
			<ChatMessageSendContainer>
				<textarea />
				<button>전송</button>
			</ChatMessageSendContainer>
		</ChattingConatiner>
	);
}
