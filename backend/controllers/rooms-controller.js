const roomService = require("../services/room-service");
const Room = require('../models/room-model')


class RoomsController {
  async create(req, res) {
    try {
      const { roomName, roomType } = req.body;
      const arr = [req.user]
      const data = new Room({roomID: Date.now().toString(), roomName,roomType, admin: req.user, partcipants: arr})
      await data.save()
      res.status(200).json(data)
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
    const findData = await Room.find({roomType: 'open'})
    return res.status(200).json({rooms: findData})
  }
  async getRoom(req, res) {
    const {roomID} = req.body
    if(!roomID){
      return res.status(400).json({ msg: "error" });
    }
    const findData = await Room.find({roomID})
    return res.status(200)
  }
}

module.exports = new RoomsController();
