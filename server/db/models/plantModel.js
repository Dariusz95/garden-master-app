const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantSchema = new Schema({
  kind: {
    type: String,
    required: [true, "Kind is required"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  tips: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  like: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
