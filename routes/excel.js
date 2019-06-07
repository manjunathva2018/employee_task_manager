const express = require('express');
var router = express.Router();
var excelExport = require('../controllers/excelExportController');

router
	.route('/get')
                .get(excelExport.sendExcel)

module.exports = router;
