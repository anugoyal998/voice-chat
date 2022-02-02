const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");
const UserDto = require("../services/user-dto");

class AuthController {
  async sendOtp(req, res) {
    try {
      if (!req.body?.phone) {
        return res.status(400).json({ msg: "error" });
      }
      const { phone } = req.body;
      const otp = await otpService.generateOtp();
      const ttl = 1000 * 60 * 10; // 2 min
      const expires = Date.now() + ttl;
      const data = `${phone}.${otp}.${expires}`;
      const hash = hashService.hashOtp(data);
      // await otpService.sendBySms(phone, otp);
      // res.status(200).json({ hash: `${hash}.${expires}`, phone });
      res.status(200).json({ hash: `${hash}.${expires}`, phone, otp });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "error" });
    }
  }
  async verifyOtp(req, res) {
    try {
      const { otp, hash, phone } = req.body;
      if (!otp || !hash || !phone) {
        return res.status(400).json({ msg: "error" });
      }
      const [hashedOtp, expires] = hash.split(".");
      if (Date.now() > +expires) {
        return res.status(400).json({ msg: "Session Timeout" });
      }
      const data = `${phone}.${otp}.${expires}`;
      const isValid = otpService.verifyOtp(hashedOtp, data)
      if(!isValid) {
        return res.status(400).json({ msg: "Invalid Otp" });
      }
      let user;
      user = await userService.findUser({phone: phone})
      if(!user){
        user = await userService.createUser({phone: phone})
      }
      const  {accessToken, refreshToken} = tokenService.generateTokens({_id: user._id, activated: false})
      res.cookie('refreshToken',refreshToken,{maxAge: 1000*60*60*24*7, httpOnly: true})
      const userDto = new UserDto(user)
      res.status(200).json({accessToken,user: userDto})
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "error" });
    }
  }
}

module.exports = new AuthController();