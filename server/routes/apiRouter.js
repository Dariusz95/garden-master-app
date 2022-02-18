const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const isAuth = require("../middleware/authMiddleware");

const UserController = require("../controllers/user-controller");
const plantController = require("../controllers/plant-controller");

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.post("/refresh", UserController.refreshToken);

router.get("/admin", isAuth, (req, res) => {
  res.send("witoj");
});

router.post("/plants", plantController.create);

router.get("/plants", (req, res) => {
  res.send("asdsa");
});

module.exports = router;
