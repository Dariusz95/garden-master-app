const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const Plant = require("../db/models/plantModel");
// const User = require("../db/models/userModel");
const UserController = require("../controllers/user-controller");
const plantController = require("../controllers/plant-controller");

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.post("/plants", plantController.create);

router.get("/plants", (req, res) => {
  res.send("asdsa");
});

module.exports = router;
