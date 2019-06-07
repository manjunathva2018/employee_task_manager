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
				 .get(userDetails.getAllUserTypeDetails)

router
  .route('/userType/:userType')
				.get(userDetails.getUserTypeDetails)

router
		.route('/update')
						 .put(userDetails.updateUserDetails)
						 
router
	 .route('/delete/:id')
						.get(userDetails.deleteUserDetails)


router
       .route('/updateLogout')
                        .put(userDetails.updateLogoutDetails)

module.exports = router;
