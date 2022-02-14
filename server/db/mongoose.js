const mongoose = require("mongoose");
const { database } = require("../config");

mongoose.connect(
  "mongodb+srv://darek95:garden12@cluster0.8dsff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

module.exports = mongoose;

// const connectMongoDB = async () => {
//   mongoose
//     .connect(
//       "mongodb+srv://darek95:garden12@cluster0.8dsff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     )
//     .then(() => console.log("Connected Successfully"))
//     .catch((err) => console.error("Not Connected"));
// };

// module.exports = connectMongoDB;
