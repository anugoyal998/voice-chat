const UserModel = require('../models/user-model')

class UserService{
    async findUser(filter){
        try {
            const user = await UserModel.findOne(filter)
            return user
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async createUser(data){
        try {
            const user = await UserModel.create(data)
            return user
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = new UserService()