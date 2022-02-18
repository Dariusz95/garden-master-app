const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

module.exports = RefreshToken;
