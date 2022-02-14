// import mongoose from "mongoose";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantSchema = new mongoose.Schema({
  kind: {
    type: String,
    required: [true, "Kind is required"],
  },
  tips: {
    type: String,
  },
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
