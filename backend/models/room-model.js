const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomName: { type: String, required: true },
    roomID: { type: String, required: true },
    roomType: { type: String, required: true },
    admin: { type: Object, required: true },
    partcipants: { type: Array, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);