const mongoose = require("mongoose");

const { Schema } = mongoose;
const chatSchema = new Schema({
  roomId: {
    type: Number,
    required: true,
  },
  fromIdx: {
    type: Number,
    required: true,
  },
  toIdx: {
    type: Number,
    required: true,
  },
  message: String,
  gif: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Chat", chatSchema);
