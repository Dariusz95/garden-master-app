const jwt = require("jsonwebtoken");
const { jwt_secret_key } = require("../config.js");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
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
