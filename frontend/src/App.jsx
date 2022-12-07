import { Route, Routes } from "react-router-dom";
import ApplicationPage from "./pages/Application";
import ChatPage from "./pages/Chat";
import MainPage from "./pages/Main";
import MyPage from "./pages/Mypage";
import Header from "./components/Header";

import Deal from "./pages/Deal";
import Description from "./pages/Description";
import LoginPage from "./pages/Login/index";
import Register from "./pages/Register";
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
				<Route path="/Login" element={<LoginPage />} />
				<Route path="/Register" element={<Register />} />
				<Route path="/Description" element={<Description />} />
				<Route path="/Deal" element={<Deal />} />
			</Routes>
		</div>
	);
}

export default App;
