const socketIo = require("socket.io");

module.exports = (server) => {
  const io = socketIo(server, { cors: { origin: "*" } });
  io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);
    });
  });
};
