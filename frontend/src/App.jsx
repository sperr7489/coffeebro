import { Route, Routes } from "react-router-dom";
import ApplicationPage from "./pages/Application";
import ChatPage from "./pages/Chat";
import LoginPage from "./pages/Login";
import MainPage from "./pages/Main";
import MyPage from "./pages/Mypage";
import Header from "./components/Header";

function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/application" element={<ApplicationPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/chat" element={<ChatPage />} />
				<Route path="/mypage" element={<MyPage />} />
			</Routes>
		</div>
	);
}

export default App;
