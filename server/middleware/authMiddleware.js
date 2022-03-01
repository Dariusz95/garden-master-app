const jwt = require("jsonwebtoken");
const { jwt_secret_key } = require("../config.js");

const authMiddleware = async (req, res, next) => {
  const token = await req.headers["authorization"]?.split(" ")[1];
  if (token === "null") {
    return res.status(401).json("no token");
  }

  jwt.verify(token, jwt_secret_key, (err, data) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = data;
    next();
  });
};

module.exports = authMiddleware;
