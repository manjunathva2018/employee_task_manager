const express = require('express');
var path=require('path');
var router = express.Router();
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/UserFileUpload')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
  var upload = multer({ storage: storage }).single('statusFile');

  router.post('/', function (req, res) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.json({success:false,message:"Some multer error occurred while uploading the file"})
        // A Multer error occurred when uploading.
      } else if (err) {
         res.json({success:false,message:"Some error occurred while uploading"})
        // An unknown error occurred when uploading.
      }
       res.json({success:true,message:"File uploaded Successfully"})
      // Everything went fine.
    })
  })

  module.exports = router;