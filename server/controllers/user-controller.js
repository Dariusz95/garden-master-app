const User = require("../db/models/userModel");
const jwt = require("jsonwebtoken");
const { jwt_refresh_key, jwt_secret_key } = require("../config");
const {
  getAccessToken,
  getRefreshToken,
  compareRefreshToken,
} = require("../services/auth/jwtService");

class UserController {
  async register(req, res) {
    const user = new User({
      login: req.body.login,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    try {
      await user.save();
      res.status(201).send("User " + req.body.email + " created");
    } catch (err) {
      res.status(403).json({
        errors: err.errors,
      });
    }
  }

  async login(req, res) {
    try {
      const user = await User.findOne({ login: req.body.login });
      if (!user) {
        throw new Error("User not found");
      }
      const isValidPassword = user.comparePassword(req.body.password);

      if (!isValidPassword) {
        throw new Error("Password not valid");
      }

      res.json({
        email: user.email,
        accessToken: getAccessToken(user),
        refreshToken: getRefreshToken(user),
      });
    } catch (e) {
      res.status(401).send("Login or password is wrong");
    }
  }

  async refreshToken(req, res) {
    if (!req.body.refreshToken) {
      return res.status(401).send("Refresh token is required");
    }
    const user = await compareRefreshToken(req.body.refreshToken);
    res.json({ accessToken: getAccessToken(user) });
  }
}

module.exports = new UserController();
