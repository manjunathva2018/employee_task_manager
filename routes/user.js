const express = require('express');
var router = express.Router();
var userDetails = require('../controllers/userController');

router
	.route('/userDetails/create')
            .post(userDetails.createUserDetails)

	router
	.route('/userDetails/userName/:userName/password/:password')
						.get(userDetails.getUserAuth)

router
   .route('/userDetails/id/:id')
					.get(userDetails.getUserDetails)
					
					
router
.route('/userDetails/getAll')
				 .get(userDetails.getAllUserDetails)

router
.route('/userDetails/getAllAdmin')
				.get(userDetails.getAllAdminDetails)

router
		.route('/userDetails/update')
						 .put(userDetails.updateUserDetails)
						 
router
	 .route('/userDetails/delete/:id')
						.get(userDetails.deleteUserDetails)

module.exports = router;
