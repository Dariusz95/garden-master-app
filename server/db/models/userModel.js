const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { validateEmail } = require("../validators");

const userSchema = new Schema({
  login: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: validateEmail,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    trim: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
});

userSchema.methods = {
  comparePassword(password) {
    let isCompare = bcrypt.compareSync(password, this.password);
    return isCompare;
  },
};

const User = mongoose.model("User", userSchema);

module.exports = User;
