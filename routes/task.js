const express = require('express');
var router = express.Router();
var taskDetails = require('../controllers/taskController');

router
	.route('/taskDetails/create')
            .post(taskDetails.createTaskDetail)


// router
//    .route('/taskDetails/id/:id')
// 					.get(taskDetails.getUserDetails)
					
					
router
.route('/taskDetails/getAll/adminId/:adminId')
				 .get(taskDetails.getAllTaskDetail)

				 					
router
.route('/taskDetails/getAll/assignedToId/:assignedToId')
				 .get(taskDetails.getAllTaskByUserId)

// router
// 		.route('/taskDetails/update')
// 						 .put(taskDetails.updateUserDetails)
	

module.exports = router;
