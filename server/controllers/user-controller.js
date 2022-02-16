const User = require("../db/models/userModel");
const jwt = require("jsonwebtoken");

class UserController {
  async register(req, res) {
    console.log(req.body);
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
      console.log(req.body);
      const user = await User.findOne({ login: req.body.login });
      if (!user) {
        throw new Error("User not found");
      }
      const isValidPassword = user.comparePassword(req.body.password);
      if (!isValidPassword) {
        throw new Error("Password not valid");
      }

      const payload = user;
      const token = jwt.sign(payload, proccess.env.ACCESS_TOKEN, {
        expiresIn: "15s",
      });

      res.json({ token });
    } catch (e) {
      res.status(401).send("Login or password is wrong");
    }
  }
}

module.exports = new UserController();
