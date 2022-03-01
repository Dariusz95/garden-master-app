// import apiRouter from "./routes/apiRouter.js";
const apiRouter = require("./routes/apiRouter");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());

// app.use(express.static("uploads"));
app.use(cors());
require("./db/mongoose");

app.use("/api/images", express.static(__dirname + "/uploads"));
app.use("/api", apiRouter);

module.exports = app;
