const express = require('express');
var router = express.Router();
var taskDetails = require('../controllers/taskController');

router
	.route('/create')
            .post(taskDetails.createTaskDetail)


// router
//    .route('/id/:id')
// 					.get(taskDetails.getUserDetails)
					
					
router
.route('/getAllByAdmin/adminId/:adminId')
				 .get(taskDetails.getAllTaskDetail)

				 					
router
.route('/getAllByUser/assignedToId/:assignedToId')
				 .get(taskDetails.getAllTaskByUserId)

router
	.route('/update')
				 .put(taskDetails.updateSingleTask)
	

module.exports = router;
