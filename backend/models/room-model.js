const mongoose = require("mongoose");

const Schema = mongoose.Schema

const roomSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true},
    ownerId: { type: Schema.Types.ObjectId, required: true},
    roomType: { type: String, ref: 'User'},
    speakers: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
      required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);