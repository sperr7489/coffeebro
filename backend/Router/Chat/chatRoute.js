const express = require("express");
const app = express();
const router = express.Router();
const { verifyAccessToken } = require("../../config/jwt");
const chatController = require("./chatController");

const io = app.get("socketIo");
console.log(io);

router.use("/", (req, res) => {
  io.on("connection", (socket) => {
    socket.on("req", (msg) => {
      console.log("tesefewt");
    });
    // socket.on("send Message", (msg) => {});
  });
});

module.exports = router;
