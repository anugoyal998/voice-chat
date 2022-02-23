const mongoose = require('mongoose')
const roomService = require("../services/room-service");
const RoomDto = require("../dtos/room-dto");
const Room = mongoose.model('Room');
const User = require("../models/user-model");
const userService = require('../services/user-service');

class RoomsController {
  async create(req, res) {
    try {
      const { roomID, roomName } = req.body;
      const user = await userService.findUser({_id: req.user._id})
      console.log(user)
      const room = await Room.findOneAndUpdate(
        { roomID },
        {
          $set: {
            roomName: roomName || "Unknown Room",
            MeetingUsers: [],
            screenShareInRoom: {
              id: null,
              name: null,
            },
            chats: [],
          },
          $push: {
            roomPresentUsers: {
              userId: req.user._id,
              name: req.user.name,
              socketId: req.body.socketId,
            },
          },
        },
        {
          upsert: true,
          new: true,
        }
      );
      await User.findByIdAndUpdate(req.user._id,{
          $push:{
              rooms: roomID
          }
      })
      res.status(200).json({room})
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "error" });
    }
  }
  async index(req, res) {
    try {
      const rooms = await Room.find({});
    //   const allRooms = rooms.map((room) => new RoomDto(room));
      return res.status(200).json({ allRooms: rooms });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "error" });
    }
  }
  async show(req, res) {
    const room = await roomService.getRoom(req.params.roomId);

    return res.json(room);
  }
}

module.exports = new RoomsController();
