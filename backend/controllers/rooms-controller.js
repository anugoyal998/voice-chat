const roomService = require("../services/room-service");
const Room = require("../models/room-model");

class RoomsController {
  async create(req, res) {
    try {
      const { roomName, roomType } = req.body;
      const data = new Room({
        roomID: Date.now().toString(),
        roomName,
        roomType,
        admin: req.user,
        partcipants: [],
      });
      await data.save();
      res.status(200).json(data);
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
  async getAllRooms(req, res) {
    const findData = await Room.find({ roomType: "open" });
    return res.status(200).json({ rooms: findData });
  }
  async getRoom(req, res) {
    const { roomID } = req.body;
    if (!roomID) {
      return res.status(400).json({ msg: "error" });
    }
    const findData = await Room.find({ roomID });
    return res.status(200).json({ room: findData });
  }

  // socket functions
  //   const arr = {} // roomID --> {user, socketID}

  async addUserToRoom(roomID, user, socketID) {
    let room = await Room.findOne({ roomID });
    let arr = room?.partcipants;
    const found = arr?.find((element) => element?.user?._id === user?._id);
    if (!found) {
      arr.push({ user, socketID });
    }
    await Room.updateOne({ _id: room?._id }, { $set: { partcipants: arr } });
  }

  async getPartcipants(roomID) {
    let room = await Room.findOne({ roomID });
    return room?.partcipants;
  }
}

module.exports = new RoomsController();
