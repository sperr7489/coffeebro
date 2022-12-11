const { axios } = require("axios");
const SocketIO = require("socket.io");

const cookieParser = require("cookie-parser");
const cookie = require("cookie-signature"); // 쿠키 암호화
// const chatController = require("../Router/Chat/chatController");
// const chatProvider = require("../Router/Chat/chatProvider");
const Chat = require("../schemas/chat");

//socketIo 역시 미들웨어를 사용할 수 있다.

module.exports = (server, app) => {
	// 현재 이 서버는 express 서버로 통신을 받고 있는 객체이다.
	const io = SocketIO(server, {
		path: "/socket.io",
		cors: {
			origin: "*",
			methods: ["GET", "POST"],
		},
	});
	app.set("io", io); // 이를 통해서 req.app.get('io')를 통해서 접근이 가능하다.

	// 이 of 를 통해서 네임스페이스를 지정할 수 있다.
	const room = io.of("/room"); // 채팅방 생성 및 삭제에 관한 정보를 전달하는 네임스페이스
	const chat = io.of("/chat"); // 채팅 메시지를 전달하는 네임스페이스

	// io.use 메서드에 미들웨어를 장착할 수 있다. => 모든 웹 소켓 연결 시마다 실행된다.
	// io.use => a function which will be called each time you have data transmission via socket.io.
	io.use((socket, next) => {
		//그렇다면 여기 next에는 coffeebro의 controller를 넣을 수 있겠군.

		//서버에서 axios를 보낼 때는 쿠키가 같이 보내지지 않기 때문에 요청 헤더에 세션 쿠키를 직접 넣어주어야 한다.
		// 따라서 socket.io 쿠키 관련 미들웨어를 연결한다.
		cookieParser(process.env.COOKIE_SECRET)(socket.request, socket.request.res || {}, next);
	});

	room.on("connection", (socket) => {
		// io객체에 대한 connection이 일어나면 socket에 대한 콜백함수가 발생.
		console.log("room 네임스페이스에 접속하였다. ");
		socket.on("disconnect", () => {
			console.log("room 네임스페이스 접속 해제");
		});
	});

	/**
	 *  특정 네임스페이스인 채널로 "connection"되게 되면
	 *  참가한다는 join 함수와 그 채널에서 빠져나간다는 leave함수가 socket에 존재한다.
	 *  이 둘은 방의 아이디를 인수로 받는다.
	 */
	chat.on("connection", (socket) => {
		// io객체에 대한 connection이 일어나면 socket에 대한 콜백함수가 발생.

		const req = socket.request;
		const {
			headers: { referer },
		} = req;
		const chatRoomIdx = referer.split("/")[referer.split("/").length - 1].replace(/ \?.+/, "");
		// console.log("referer : ", referer);
		//6393f2cbfd0c06af4a93d17d?password=
		//6393f2cbfd0c06af4a93d17d?password=
		socket.join(chatRoomIdx); // join을 하는 순간 해당 roomId로 들어가게 됨.

		socket.to(chatRoomIdx).emit("join", {
			// join이라는 이벤트에 전달해주는 data
			user: "system",
			chat: `님이 입장하셨습니다.`,
		});

		socket.on("send_message", (data) => {
			const { fromIdx, toIdx, message, chatRoomIdx } = data;
			// const { applicantIdx, agentIdx } = await chatProvider.getChatRoomInfo(
			//   chatRoomIdx
			// );

			// 디비에 채팅 내역 저장하기
			const createdAt = new Date();
			Chat.create({
				chatRoomIdx: chatRoomIdx,
				fromIdx,
				toIdx,
				message: message,
				createdAt: createdAt,
			}).then(() => {
				console.log("DB에 채팅 내역 저장 성공");
				socket.emit("send_message", { ...data, createdAt: createdAt });
			});
		});

		console.log("chat 네임스페이스에 접속하였다. ");
		socket.on("disconnect", () => {
			console.log("chat 네임스페이스 접속 해제");
			socket.leave();

			// const currentRoom = socket.adapter.rooms[chatRoomIdx];
		});
	});

	// 특별한 네임스페이스가 없는 경우.
	io.on("connection", (socket) => {
		// 웹소켓 연결 시
		const req = socket.request;
		// socket.request 속성을 통해서 요청 객체에 접근할 수 있다.
		// socket.request.res를 통해서 응답객체에 접근 할 수 있다.
		// socket.id 를 통해서 소켓 고유의 아이디를 가져올 수 있다.

		// 클라이언트의 ip를 알아내는 유명한 방법 중 하나.
		const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

		//ws 같은 경우에는 webSocket이 내장으로 갖고있는 message, disconnect, error,reply 등으로
		// 관리하였지만 socket.io 같은 경엔 다음 socket에 이벤트 리스너를 통해서 관리할 수 있다.
		socket.on("disconnect", () => {
			// 연결 종료 시
			console.log("클라이언트 접속 해제", ip, socket.id);
		});
		socket.on("error", (error) => {
			// 에러 시
			console.error(error);
		});
	});
	//   ws.on("reply", (data) => {
	//     // 클라이언트로부터 메시지
	//     console.log(data);
	//   });
	//   ws.interval = setInterval(() => {
	//     // 3초마다 클라이언트로 메시지 전송
	//     if (ws.readyState === ws.OPEN)
	//       ws.send("서버에서 클라이언트로 요청 계속 보냄!");
	//   }, 3000);
	// });
};
