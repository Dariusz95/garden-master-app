require("dotenv").config();

module.exports = {
  database: process.env.DATABASE,
  port: process.env.PORT || 3000,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  jwt_refresh_key: process.env.JWT_REFRESH_KEY,
};
