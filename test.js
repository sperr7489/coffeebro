const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = 3005;

app.get("/", (req, res) => {
  // 지금 여기서 그럼 서버에 접속을 하게 된다.
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("test");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
