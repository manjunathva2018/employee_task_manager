const express = require('express');
var router = express.Router();
var userDetails = require('../controllers/userController');

router
	.route('/create')
            .post(userDetails.createUserDetails)

router
	.route('/userName/:userName/password/:password')
					.get(userDetails.getUserAuth)

router
   .route('/id/:id')
					.get(userDetails.getUserDetails)
					
					
router
   .route('/getAll')
				 .get(userDetails.getAllUserDetails)

router
  .route('/getAllAdmin')
				.get(userDetails.getAllAdminDetails)

router
		.route('/update')
						 .put(userDetails.updateUserDetails)
						 
router
	 .route('/delete/:id')
						.get(userDetails.deleteUserDetails)

module.exports = router;
