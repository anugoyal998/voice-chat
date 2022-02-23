const tokenService = require("../services/token-service")

module.exports = async (req, res, next) => {
    try {
        const {at: accessToken} = req.body
        if(!accessToken){
            throw new Error()
        }
        const userData = await tokenService.verifyAccessToken(accessToken)
        if(!userData){
            throw new Error()
        }
        req.user = userData
        next()
    } catch (error) {
        res.status(400).json({msg: 'Invalid Token'})
    }
}