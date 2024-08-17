const express = require('express');
const submissionController = require('../controllers/submissionController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, submissionController.createSubmission);
router.get('/:testId/:userId', authMiddleware, submissionController.getSubmissionByTestAndUser);

// router
//   .route('/')
//   .post(authMiddleware, submissionController.createSubmission);

// router
//   .route('/:testId/:userId')
//   .get(authMiddleware, submissionController.getSubmissionByTestAndUser);

module.exports = router;
