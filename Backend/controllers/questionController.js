const Question = require('../models/questionModel');

// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const { question, options, correctOption, marks, section } = req.body;

    // Validate required fields
    if (!question || !options || !correctOption || !marks) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create the question
    const newQuestion = await Question.create({
      question,
      options,
      correctOption,
      section,
      marks,
      isDeleted: false, // Default value for isDeleted
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


exports.createQuestionsBulk = async (req, res) => {
  try {
    const questions = req.body;

    // Validate that the input is an array
    if (!Array.isArray(questions)) {
      return res.status(400).json({ message: 'Input must be an array of questions' });
    }

    // Validate each question object
    for (const que of questions) {
      const { question, options, correctOption, marks } = que;

      if (!question || !options || !correctOption || !marks) {
        return res.status(400).json({ message: 'All fields are required for each question' });
      }

      if (!Array.isArray(options) || options.length === 0) {
        return res.status(400).json({ message: 'Options must be a non-empty array' });
      }
    }

    // Create questions in bulk
    const newQuestions = await Question.insertMany(questions.map(que => ({
      question: que.question,
      options: que.options,
      correctOption: que.correctOption,
      section: que.section,
      marks: que.marks,
      isDeleted: false, // Default value for isDeleted
    })));

    res.status(201).json({
      message: 'Questions created successfully',
      questions: newQuestions,
      ids: newQuestions.map(que => que._id),
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating questions',
      error: error.message,
    });
  }
};


// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    // const questions = await Question.find({ isDeleted: false }); // Filter out deleted questions
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

    if (!question || question.isDeleted) {
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
    const { question, options, correctOption, marks } = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { question, options, correctOption, marks },
      { new: true, runValidators: true }
    );

    if (!updatedQuestion || updatedQuestion.isDeleted) {
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
    const deletedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({
      message: 'Question deleted successfully',
      question: deletedQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting question',
      error: error.message,
    });
  }
};
