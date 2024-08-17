const Question = require('../models/questionModel');

// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const { question, options, correctOption, marks } = req.body;

    // Validate required fields
    if (!question || !options || !correctOption || !marks) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create the question
    const newQuestion = await Question.create({
      question,
      options,
      correctOption,
      marks,
    });

    res.status(201).json({
      message: 'Question created successfully',
      question: newQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating question',
      error: error.message,
    });
  }
};

// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();

    res.status(200).json({
      message: 'Questions fetched successfully',
      questions,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching questions',
      error: error.message,
    });
  }
};

// Get a single question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({
      message: 'Question fetched successfully',
      question,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching question',
      error: error.message,
    });
  }
};

// Update a question by ID
exports.updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({
      message: 'Question updated successfully',
      question: updatedQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating question',
      error: error.message,
    });
  }
};

// Delete a question by ID
exports.deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({
      message: 'Question deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting question',
      error: error.message,
    });
  }
};
