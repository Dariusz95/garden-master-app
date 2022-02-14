const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Plant = require("../db/models/plantModel");

router.post("/plants", (req, res) => {
  console.log(req.body);
  console.log(mongoose.connection.readyState);
  const plant = new Plant({
    kind: req.body.kind,
    tips: req.body.tips,
  });

  plant
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.get("/plants", (req, res) => {
  res.send("asdsa");
});

module.exports = router;
