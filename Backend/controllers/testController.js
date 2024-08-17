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
      isDeleted: false, // Default value for isDeleted
    });

    // update the questions with the testId
    await Question.updateMany({ _id: { $in: questions } }, { $push: { testId: newTest._id } });

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
    const tests = await Test.find({ isDeleted: false }).populate('questions'); // Populate the questions

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

    if (!test || test.isDeleted) {
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
    const { title, description, questions } = req.body;

    // Validate if questions are passed
    if (questions) {
      // Check if the questions exist in the Question collection
      const validQuestions = await Question.find({ _id: { $in: questions } });

      if (validQuestions.length !== questions.length) {
        return res.status(400).json({ message: 'One or more questions are invalid' });
      }
    }

    const updatedTest = await Test.findByIdAndUpdate(req.params.id, { title, description, questions }, {
      new: true,
      runValidators: true,
    }).populate('questions'); // Populate the questions

    if (!updatedTest || updatedTest.isDeleted) {
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
    const deletedTest = await Test.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });

    if (!deletedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.status(200).json({
      message: 'Test deleted successfully',
      test: deletedTest,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting test',
      error: error.message,
    });
  }
};
