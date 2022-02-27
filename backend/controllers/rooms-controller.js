const roomService = require("../services/room-service");
const Room = require("../models/room-model");
const RoomDto = require("../dtos/room-dto");

class RoomsController {
  async create(req, res) {
    try {
      const {topic,roomType} = req.body
      if(!topic || !roomType){
        return res.status(400).json({ msg: "error" });
      }
      const room  = await roomService.create({topic,roomType,ownerId: req.user._id})
      return res.status(200).json(new RoomDto(room))
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "error" });
    }
  }
  async index(req, res) {
    try {
      const rooms = await roomService.getAllRooms(['open'])
      const allRooms = rooms?.map(room=> new RoomDto(room))
      return res.status(200).json(allRooms)
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
    if (!arr) arr = [];
    const found = arr?.find((element) => element?.user?._id === user?._id);
    if (!found) {
      arr.push({ user, socketID });
    } else {
      let curr = found;
      curr.socketID = socketID;
      arr = arr?.filter((element) => element.user._id !== user._id);
      arr.push(curr);
    }
    await Room.updateOne({ _id: room?._id }, { $set: { partcipants: arr } });
  }

  async getPartcipants(roomID) {
    let room = await Room.findOne({ roomID });
    return room?.partcipants;
  }

  async removeUserFromRoom(user, roomID) {
    let room = await Room.findOne({ roomID });
    let arr = room?.partcipants;
    arr = arr.filter((e) => e.user._id !== user._id);
    await Room.updateOne({ _id: room._id }, { $set: { partcipants: arr } });
  }
}

module.exports = new RoomsController();
