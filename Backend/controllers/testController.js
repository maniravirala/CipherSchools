const Test = require('../models/testModel');
const Question = require('../models/questionModel');

// Create a new test
exports.createTest = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    // Validate if questions are passed
    if (!questions || !questions.length) {
      return res.status(400).json({ message: 'Questions are required' });
    }

    // Check if the questions exist in the Question collection
    const validQuestions = await Question.find({ _id: { $in: questions } });

    if (validQuestions.length !== questions.length) {
      return res.status(400).json({ message: 'One or more questions are invalid' });
    }

    // Create the test
    const newTest = await Test.create({
      title,
      description,
      questions,
    });

    res.status(201).json({
      message: 'Test created successfully',
      test: newTest,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating test',
      error: error.message,
    });
  }
};

// Get all tests
exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().populate('questions'); // Populate the questions

    res.status(200).json({
      message: 'Tests fetched successfully',
      tests,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching tests',
      error: error.message,
    });
  }
};

// Get a single test by ID
exports.getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate('questions'); // Populate the questions

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.status(200).json({
      message: 'Test fetched successfully',
      test,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching test',
      error: error.message,
    });
  }
};

// Update a test by ID
exports.updateTest = async (req, res) => {
  try {
    const updatedTest = await Test.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('questions'); // Populate the questions

    if (!updatedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.status(200).json({
      message: 'Test updated successfully',
      test: updatedTest,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating test',
      error: error.message,
    });
  }
};

// Delete a test by ID
exports.deleteTest = async (req, res) => {
  try {
    const deletedTest = await Test.findByIdAndDelete(req.params.id);

    if (!deletedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.status(200).json({
      message: 'Test deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting test',
      error: error.message,
    });
  }
};
