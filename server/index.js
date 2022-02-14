const express = require("express");
const app = require("./app.js");
const { port } = require("./config");

app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
