const jimp = require('jimp')
const path = require('path')
const UserDto = require('../dtos/user-dto')
const userService = require('../services/user-service')

class ActivateController{
    async activate(req,res){
        try {
            const {name,avatar} = req.body
            if(!name || !avatar){
                return res.status(400).json({msg: 'error'})
            }
            const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`
            const buffer = Buffer.from(avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/,''),'base64')
            const jimResp = await jimp.read(buffer)
            jimResp.resize(100,jimp.AUTO).write(path.resolve(__dirname,`../storage/${imagePath}`))
            // update user
            const userId = req.user._id
            const user = await userService.findUser({_id: userId})
            if(!user){ 
                return res.status(400).json({msg: 'user not found'})
            }
            user.activated = true
            user.name = name
            user.avatar = `/storage/${imagePath}`
            await user.save()
            res.status(200).json({user: new UserDto(user), auth: true})
        } catch (error) {
            console.log(error)
            return res.status(400).json({msg: 'error'})
        }
    }
}

module.exports = new ActivateController()