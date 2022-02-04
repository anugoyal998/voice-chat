const roomService = require("../services/room-service")
const RoomDto = require("../dtos/room-dto")

class RoomsController{
    async create(req,res){
        try {
            const {topic, roomType} = req.body
            if(!topic || !roomType){
                return res.status(400).json({ msg: 'error'})
            }
            const room = await roomService.create({topic, roomType, ownerId: req.user._id})
            return res.status(200).json(new RoomDto(room))
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: 'error'})
        }
    }
    async index(req,res) {
        try {
            const rooms = await roomService.getAllRooms(['open'])
            const allRooms = rooms.map(room=> new RoomDto(room))
            return res.status(200).json({allRooms})
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: 'error'})
        }
    }
}

module.exports = new RoomsController()