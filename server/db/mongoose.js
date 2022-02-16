const mongoose = require("mongoose");
const { database } = require("../config");

mongoose.connect(
  "mongodb+srv://darek95:garden12@cluster0.8dsff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose;
