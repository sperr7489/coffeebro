import styled from "styled-components";

export const UserListContainer = styled.div`
	width: 400px;
	border: 1px solid black;
	margin-left: 40px;
	height: 605px;
	overflow: auto;
`;
export const UserInfoContainer = styled.div`
	display: flex;
	width: 400px;
	padding: 10px;
	align-items: center;
	& > span {
		display: inline-block;
		width: 300px;
		color: #9f9f9f;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	& > div {
		margin-right: 10px;
		div {
			width: 50px;
			height: 50px;
			border: 1px solid black;
			margin-bottom: 10px;
		}
	}
`;
