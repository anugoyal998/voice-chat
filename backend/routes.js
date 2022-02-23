const router =  require('express').Router()
const activateController = require('./controllers/activate-controller')
const authController = require('./controllers/auth-controller')
const roomsController = require('./controllers/rooms-controller')
const authMiddleware = require('./middlewares/auth-middleware')

const use = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}


router.post('/api/send-otp',authController.sendOtp)
router.post('/api/verify-otp',authController.verifyOtp)
router.post('/api/saveUser',use(authController.saveUser))
router.post('/api/activate',authMiddleware,activateController.activate)
router.post('/api/refresh',authController.refresh)
router.post('/api/logout',authMiddleware,authController.logout)
router.post('/api/createRoom',authMiddleware,roomsController.create)
router.post('/api/getAllRooms',authMiddleware,use(roomsController.getAllRooms))
router.get('/api/rooms/:roomId', authMiddleware, roomsController.show);


module.exports = router