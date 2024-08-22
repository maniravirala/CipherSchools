const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protect routes with authMiddleware
router.use(authMiddleware);

// Create a new submission
router.post('/', submissionController.createSubmission);

// Get a submission by testId and userId
router.get('/:testId/:userId', submissionController.getSubmissionByTestAndUser);

// Update a submission by ID
router.post('/:testId', submissionController.updateSubmission);

// Soft delete a submission by ID
router.patch('/:id/delete', submissionController.deleteSubmission);

// Get all submissions for a test
router.get('/test/:testId', submissionController.getAllSubmissionsForTest);

// Get all submissions by a user
router.get('/user/:userId', submissionController.getAllSubmissionsByUser);

module.exports = router;
