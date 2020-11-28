const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileStore = require('multer');
const multer = require('multer');

var storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, 'public/images');
     },

     filename: (req, file, cb) => {
          cb(null, file.originalname);
     }
});

const imageFileFilter = (req, file, cb) => {
     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error("You can only upload image files."), false);
     }
     cb(null, true);
}

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

const savePhotoRouter = express.Router();

savePhotoRouter.use(bodyParser.json());

savePhotoRouter.route('/')
.get((req, res,next) => {
     res.statusCode = 403;
     res.end("GET Operation NOT supported!");
})
.put((req, res,next) => {
     res.statusCode = 403;
     res.end("GET Operation NOT supported!");
})
.post(upload.single('image'), (req, res) => {
     res.statusCode = 200;
     res.setHeader('Content-Type', 'application/json');
     res.json(req.file);
})
.delete((req, res,next) => {
     res.statusCode = 403;
     res.end("GET Operation NOT supported!");
});

module.exports = savePhotoRouter;