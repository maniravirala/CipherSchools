const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protect routes with authMiddleware
router.use(authMiddleware);

// Public routes
router.post('/', questionController.createQuestion);
router.get('/', questionController.getAllQuestions);
router.get('/:id', questionController.getQuestionById);
router.put('/:id', questionController.updateQuestion);
router.delete('/:id', questionController.deleteQuestion);

module.exports = router;
