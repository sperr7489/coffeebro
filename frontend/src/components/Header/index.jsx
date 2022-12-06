import { HeaderContainer, RightChildContainer } from "./index.style";
import { icAlarm, icUser, icMenu } from "@/assets/icons";
import { useNavigate } from "react-router-dom";

export default function Header() {
	const navigate = useNavigate();
	return (
		<HeaderContainer>
			<img src={icMenu} />
			<span>커피가게아저씨</span>
			<RightChildContainer>
				<button>
					<img src={icAlarm} />
				</button>
				<button onClick={() => navigate("/mypage")}>
					<img src={icUser} />
				</button>
			</RightChildContainer>
		</HeaderContainer>
	);
}
