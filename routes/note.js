const express = require('express');
var router = express.Router();
var noteDetails = require('../controllers/noteController');

router
	.route('/create')
            .post(noteDetails.createNoteDetails)

router
	.route('/userId/:userId')
                .get(noteDetails.getAllNotesDetails)
                    						 
router
	 .route('/delete/:id')
				.get(noteDetails.deleteNoteDetails)

module.exports = router;
