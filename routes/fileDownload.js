const express = require('express');
var router = express.Router();
var path = require('path');
var mime = require('mime');
var fs = require('fs');


router
  .route('/fileName/:fileName').get(function (req, res) {

    var fileReq = req.params.fileName;
    var file = path.join(__dirname, '../public/UserFileUpload/' + fileReq);
    var filename = path.basename(file);
    var mimetype = mime.lookup(file);
    // res.download(file); // Set disposition and send it.

    fs.exists(file, function (exists) {
      if (exists) {
        res.writeHead(200, {
          "Content-Type": mimetype,
          "Content-Disposition": "attachment; filename=" + filename
        });
        fs.createReadStream(file).pipe(res);
      } else {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("ERROR File does NOT Exists");
      }
    });

  });



module.exports = router;