const express = require('express');
var router = express.Router();
var profileDetails = require('../controllers/profileController');

router
	.route('/create')
            .post(profileDetails.createProfileDetails)

router
    .route('/getByUserId/:userId')
            .get(profileDetails.getProfileByUserId)
					
router
   .route('/getAll')
			 .get(profileDetails.getAllProfileDetails)

router
	.route('/update')
			.put(profileDetails.profileUpdateDetails)
						 
router
	 .route('/delete/:id')
            .get(profileDetails.deleteProfileDetails)

module.exports = router;
