const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protect routes with authMiddleware
router.use(authMiddleware);

// Create a new test
router.post('/', testController.createTest);

// Get all tests
router.get('/', testController.getAllTests);

// Get a single test by ID
router.get('/:id', testController.getTestById);

// Update a test by ID
router.patch('/:id', testController.updateTest);

// Delete a test by ID
router.delete('/:id', testController.deleteTest);

module.exports = router;
