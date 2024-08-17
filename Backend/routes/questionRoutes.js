const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Create a question
router.post('/create', questionController.createQuestion);

// Get all questions
router.get('/', questionController.getAllQuestions);

// Get a single question by ID
router.get('/:id', questionController.getQuestionById);

// Update a question by ID
router.put('/:id', questionController.updateQuestion);

// Delete a question by ID
router.delete('/:id', questionController.deleteQuestion);

module.exports = router;
