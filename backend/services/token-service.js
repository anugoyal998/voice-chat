const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
const refreshModel = require("../models/refresh-model");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "7d",
    });
    return { accessToken, refreshToken };
  }
  async storeRefreshToken(token, userId) {
    try {
      const data = await refreshModel.find({ token, userId });
      if (data?.length <= 0) {
        await refreshModel.create({ token, userId });
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
  async verifyAccessToken(token) {
    return jwt.verify(token, accessTokenSecret);
  }
  async verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, refreshTokenSecret);
  }
  async findRefreshToken(userId) {
    return await refreshModel.findOne({ userId: userId });
  }
  async updateRefreshToken(userId, refreshToken) {
    const data = await refreshModel.findOne({ userId });
    return await refreshModel.updateOne(
      { _id: data?._id },
      {
        $set: {
          token: refreshToken,
        },
      }
    );
  }
  async removeToken(refreshToken) {
    return await refreshModel.deleteOne({ token: refreshToken });
  }
}

module.exports = new TokenService();
