const { axios } = require("axios");
const SocketIO = require("socket.io");

const cookieParser = require("cookie-parser");
const cookie = require("cookie-signature"); // 쿠키 암호화

//socketIo 역시 미들웨어를 사용할 수 있다.

module.exports = (server, app) => {
  // 현재 이 서버는 express 서버로 통신을 받고 있는 객체이다.
  const io = SocketIO(server, { path: "/socket.io" });
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
    cookieParser(process.env.COOKIE_SECRET)(
      socket.request,
      socket.request.res || {},
      next
    );
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
    const chatRoomIdx = referer
      .split("/")
      [referer.split("/").length - 1].replace(/ \?.+/, "");
    // console.log("referer : ", referer);
    //6393f2cbfd0c06af4a93d17d?password=
    //6393f2cbfd0c06af4a93d17d?password=
    socket.join(chatRoomIdx); // join을 하는 순간 해당 roomId로 들어가게 됨.

    socket.to(chatRoomIdx).emit("join", {
      // join이라는 이벤트에 전달해주는 data
      user: "system",
      chat: `${req.session.color}님이 입장하셨습니다.`,
    });

    console.log("chat 네임스페이스에 접속하였다. ");
    socket.on("disconnect", () => {
      console.log("chat 네임스페이스 접속 해제");
      socket.leave();

      const currentRoom = socket.adapter.rooms[chatRoomIdx];
      const userCount = currentRoom ? currentRoom.length : 0;

      if (userCount === 0) {
        //접속자가 0명이면 방 삭제

        //
        const signedCookie = req.signedCookies["connect.sid"];
        const connectSID = cookie.sign(signedCookie, process.env.COOKIE_SECRET);

        // 소켓 통신과 http 통신은 별도라고 생각하자. 백엔드에서도 스스로에게 http 요청을 보낼 수 있는 것이다.
        axios
          .delete(`http://localhost:8005/room/${chatRoomIdx}`, {
            headers: {
              // 서버에서 서버로 요청할 때는 요청 헤더에 직접 쿠키를 담아줘야 한다.
              Cookie: `connect.sid = s%3A${connectSID}`,
            },
          })
          .then(() => {
            console.log("방 제거 요청 성공");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        socket.to(chatRoomIdx).emit("exit", {
          user: "system",
          chat: `${req.session.color}님이 퇴장하셨습니다. `,
        });
      }
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
      clearInterval(socket.interval);
    });
    socket.on("error", (error) => {
      // 에러 시
      console.error(error);
    });
    socket.on("reply", (data) => {
      // 클라이언트로부터 메시지
      console.log(data);
    });
  });
  // wss.on("connection", (ws, req) => {
  //   // 웹소켓 연결 시
  //   // 클라이언트의 ip를 알아내는 유명한 방법 중 하나.
  //   const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  //   console.log(req);

  //   ws.on("message", (message) => {
  //     console.log(message.toString());
  //   });

  //   console.log(ip);
  //   ws.on("disconnect", () => {
  //     // 연결 종료 시
  //     console.log("클라이언트 접속 해제", ip, ws.id);
  //     clearInterval(ws.interval);
  //   });
  //   ws.on("error", (error) => {
  //     // 에러 시
  //     console.error(error);
  //   });
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
