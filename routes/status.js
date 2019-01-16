const express = require('express');
var router = express.Router();
var statusDetails = require('../controllers/statusController');

router
	.route('/statusDetails/create')
            .post(statusDetails.createStatusDetails)

			
router
.route('/statusDetails/getAll/userId/:userId')
				 .get(statusDetails.getStatusDetailsByUserId)

				 					
router
.route('/statusDetails/getAll/assignedToAdminId/:assignedToAdminId')
				 .get(statusDetails.getStatusDetailsByAdminId)

router
		.route('/statusDetails/update')
						 .put(statusDetails.updateStatusByUserDetails)
	

module.exports = router;
