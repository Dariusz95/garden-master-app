const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const isAuth = require("../middleware/authMiddleware");

const UserController = require("../controllers/user-controller");
const plantController = require("../controllers/plant-controller");
const CommentController = require("../controllers/comment-controller");

const imageService = require("../services/imageService");

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.post("/refresh", UserController.refreshToken);

router.post("/comment", isAuth, CommentController.create);
router.delete("/comment/:id", isAuth, CommentController.delete);
router.patch("/comment/:id", isAuth, CommentController.update);

router.get("/plant", plantController.showAll);
router.get("/plant/:id", plantController.showPlantByID);
router.patch(
  "/plant/:id",
  imageService.single("image"),
  isAuth,
  plantController.updatePlant
);
router.post("/plant/like", isAuth, plantController.addLike);

router.post(
  "/plant",
  imageService.single("image"),
  isAuth,
  plantController.create
);

module.exports = router;
