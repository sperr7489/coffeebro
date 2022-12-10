const mongoose = require("mongoose");

const { Schema } = mongoose;

// const roomInfoSchema = new Schema({});
const userInfoSchema = new Schema({
  userIdx: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

const roomSchema = new Schema({
  roomIdx: Number,
  applicant: {
    userIdx: {
      type: Number,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  agent: {
    userIdx: {
      type: Number,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  status: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("chatRoom", roomSchema);
