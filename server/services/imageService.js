// import { __dirname } from '../../config.js';
// import mv from 'mv';
// import Plant from '../db/models/plantModel.js';

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
