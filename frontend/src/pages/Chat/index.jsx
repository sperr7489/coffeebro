import Header from "../../components/Header";
import Chatting from "./components/Chatting";
import UserList from "./components/UserList";
import { ChatPageContainer, ChatMainContainer } from "./index.style";

export default function ChatPage() {
	return (
		<ChatPageContainer>
			<ChatMainContainer>
				<Chatting />
				<UserList />
			</ChatMainContainer>
		</ChatPageContainer>
	);
}
