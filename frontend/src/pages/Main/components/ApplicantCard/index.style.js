import styled from "styled-components";

export const CardContainer = styled.div`
	display: flex;
	width: 350px;
	height: 150px;
	justify-content: space-around;
	align-items: center;
	margin-right: 50px;
	margin-bottom: 50px;
	border-radius: 10px;
	border: 1px solid #c5875b;
	cursor: pointer;
	img {
		width: 100px;
		height: 100px;
	}
`;
export const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 200px;
	height: 100px;
`;
