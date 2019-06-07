var excelExport = require("../middlewares/excelExport");

module.exports.sendExcel = function(req, res) {
  //params means http://localhost/sample/:data
  // var data={userId:req.params.userId};
  //body means its comming from an object
  var data = req.body;

  var buffer = excelExport.createExcel();
  if (buffer) {
    console.log("\x1b[32m%s\x1b[0m", "sendExcel", buffer);
    // You can then return this straight
     res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers)
     res.send(buffer);
    // OR you can save this buffer to the disk by creating a file.
  } else {
    console.log("\x1b[31m%s\x1b[0m", "sendExcel err", err);
    //send status code 400 i.e error with json object
    res.status(400).json({ success: false, message: "error exporting excel" });
  }
};
