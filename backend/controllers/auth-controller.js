const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");
const UserDto = require("../dtos/user-dto");

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
      const isValid = otpService.verifyOtp(hashedOtp, data);
      if (!isValid) {
        return res.status(400).json({ msg: "Invalid Otp" });
      }
      let user;
      user = await userService.findUser({ phone: phone });
      if (!user) {
        user = await userService.createUser({ phone: phone });
      }
      const { accessToken, refreshToken } = tokenService.generateTokens({
        _id: user._id,
        activated: false,
      });
      await tokenService.storeRefreshToken(refreshToken, user._id);
      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
      });
      const userDto = new UserDto(user);
      res.status(200).json({ user: userDto, auth: true });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "error" });
    }
  }
  async saveUser(req, res) {
    const { email, name, avatar } = req.body;
    if (!email || !name || !avatar) {
      return res.status(400).json({ msg: "error" });
    }
    let user;
    user = await userService.findUser({ email });
    if (!user) {
      user = await userService.createUser({ email, name, avatar });
    }
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id, name, email, avatar
    });
    await tokenService.storeRefreshToken(refreshToken, user._id);
    res.status(200).json({tokens: {accessToken, refreshToken}, user: {name,email,avatar}})
  }
  async refresh(req, res) {
    try {
      if(!req.body.rt){
        return res.status(400).json({ msg: "error" });
      }
      const { rt: refreshTokenFromCookie } = req.body;
      const userData = await tokenService.verifyRefreshToken(
        refreshTokenFromCookie
      );
      const token = await tokenService.findRefreshToken(
        userData._id, refreshTokenFromCookie
      );
      if (!token) {
        return res.status(400).json({ msg: "error" });
      }
      const user = await userService.findUser({ _id: userData._id });
      if (!user) {
        return res.status(400).json({ msg: "error" });
      }
      const { refreshToken, accessToken } = tokenService.generateTokens({
        _id: userData._id, name: user?.name, email: user?.email, avatar: user?.avatar
      });
      await tokenService.updateRefreshToken(userData._id, refreshToken);
      res.status(200).json({ user, auth: true, tokens: {accessToken, refreshToken} });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "error" });
    }
  }
  async logout(req, res) {
    try {
      const { rt: refreshToken } = req.body;
      // delte refresh token from db
      await tokenService.removeToken(refreshToken);
      res.status(200).json({ user: null, auth: false });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "error" });
    }
  }
}

module.exports = new AuthController();

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjE3NDExZjI3ZTI2ZjlkZGQwMmU4ZjMiLCJuYW1lIjoiQW51YmhhdiBnb3lhbCIsImVtYWlsIjoiYW51Z295YWw5OThAZ21haWwuY29tIiwiYXZhdGFyIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKd3d1RklRSHdKbGhqZTFnWXRDcXI4TWtJVDJXOWhxQ18xVWJVNFNLUT1zOTYtYyIsImlhdCI6MTY0NTY5MTE3NSwiZXhwIjoxNjQ2Mjk1OTc1fQ.m8kzvRMQytGbHMG2LJao0UJT1eGHaPTguIQcoZE0wmE