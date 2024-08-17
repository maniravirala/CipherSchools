const express = require('express');
const testController = require('../controllers/testController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// router.get('/', authMiddleware, testController.getTests);
// router.post('/', authMiddleware, testController.createTest);

// router
//   .route('/')
//   .get(authMiddleware, testController.getTests)
//   .post(authMiddleware, testController.createTest);

// Create a test
router.post('/create', testController.createTest);

// Get all tests
router.get('/', testController.getAllTests);

// Get a single test by ID
router.get('/:id', testController.getTestById);

// Update a test by ID
router.put('/:id', testController.updateTest);

// Delete a test by ID
router.delete('/:id', testController.deleteTest);

module.exports = router;
