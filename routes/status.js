const express = require('express');
var router = express.Router();
var statusDetails = require('../controllers/statusController');

router
	.route('/create')
            .post(statusDetails.createStatusDetails)

			
router
  .route('/getAllByUser/userId/:userId')
				 .get(statusDetails.getStatusDetailsByUserId)

				 					
router
  .route('/getAllByAdmin/assignedToAdminId/:assignedToAdminId')
				 .get(statusDetails.getStatusDetailsByAdminId)

router
	.route('/update')
			.put(statusDetails.updateStatusByUserDetails)
	

module.exports = router;
