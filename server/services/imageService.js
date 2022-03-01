const path = require("path");
const multer = require("multer");

const store = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./server/uploads/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});

const uploadImage = multer({ storage: store });

module.exports = uploadImage;
