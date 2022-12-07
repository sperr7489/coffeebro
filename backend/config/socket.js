module.exports = (io) => {
  const { createClient } = require("redis");
  const { createAdapter } = require("@socket.io/redis-adapter");

  const pubClient = createClient({ host: "localhost", port: 6379 });
  const subClient = pubClient.duplicate();

  Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
    io.adapter(createAdapter(pubClient, subClient));
    io.listen(3001);
  });

  io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);
    });

    // socket.on("send Message", (msg) => {});
  });
};
