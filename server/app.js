// import apiRouter from "./routes/apiRouter.js";
const apiRouter = require("./routes/apiRouter");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

require("./db/mongoose");

// mongoose.connect(
//   "mongodb+srv://darek95:garden12@cluster0.8dsff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

app.use(bodyParser.json());
app.use(cors());

app.use("/api", apiRouter);

module.exports = app;
