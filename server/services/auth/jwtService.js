const jwt = require("jsonwebtoken");
const { jwt_refresh_key, jwt_secret_key } = require("../../config");
const RefreshToken = require("../../db/models/refreshTokenModel");

const getAccessToken = (user) => {
  const payload = {
    id: user.id,
    login: user.login,
    email: user.email,
  };
  return jwt.sign(payload, jwt_secret_key, { expiresIn: "2h" });
};

const getRefreshToken = (user) => {
  const payload = {
    id: user.id,
    login: user.login,
    email: user.email,
  };

  const token = jwt.sign(payload, jwt_refresh_key);

  try {
    saveRefreshToken(user.id, token);
    return token;
  } catch (e) {
    console.log(e);
  }
};

const saveRefreshToken = async (owner, refreshToken) => {
  deleteRefreshTokens(owner);

  const token = new RefreshToken({
    refreshToken,
    owner,
  });
  try {
    await token.save();
  } catch (e) {
    console.log(e);
  }
};

const compareRefreshToken = async (token) => {
  let userData = {};
  const refreshToken = await RefreshToken.findOne({ refreshToken: token });
  if (!refreshToken) {
    return new Error("Refresh Token Not Exists");
  }
  jwt.verify(token, jwt_refresh_key, (err, data) => {
    if (err) {
      console.log(err);
      return new Error("Refresh Token Incorrect");
    }
    return (userData = {
      id: data.id,
      email: data.email,
    });
  });
  return userData;
};
const deleteRefreshTokens = async (owner) => {
  const data = await RefreshToken.find({ owner }).select("refreshToken -_id");
  const existsTokens = [];
  data.forEach((token) => existsTokens.push(token.refreshToken));
  await RefreshToken.deleteMany({ refreshToken: { $in: existsTokens } });
};

module.exports = { getAccessToken, getRefreshToken, compareRefreshToken };
