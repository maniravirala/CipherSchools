const Submission = require('../models/submissionModel');
const Test = require('../models/testModel');
const User = require('../models/userModel');
const Question = require('../models/questionModel');

// Create a new submission
exports.createSubmission = async (req, res) => {
  try {
    const { testId, userId, selections, endedAt } = req.body;

    // Validate required fields
    if (!testId || !userId || !selections || !endedAt) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate if testId and userId exist
    const test = await Test.findById(testId);
    const user = await User.findById(userId);

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate if all questions in selections are valid
    for (const selection of selections) {
      const question = await Question.findById(selection.questionId);
      if (!question) {
        return res.status(400).json({ message: `Question ${selection.questionId} is invalid` });
      }
    }

    // Create the submission
    const newSubmission = await Submission.create({
      testId,
      userId,
      selections,
      endedAt,
      isDeleted: false, // Default value for isDeleted
    });

    res.status(201).json({
      status: 'success',
      data: {
        submission: newSubmission,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get a submission by testId and userId
exports.getSubmissionByTestAndUser = async (req, res) => {
  try {
    const { testId, userId } = req.params;
    const submission = await Submission.findOne({ testId, userId, isDeleted: false }); // Check for non-deleted submissions

    if (!submission) {
      return res.status(404).json({
        status: 'fail',
        message: 'Submission not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        submission,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Update a submission by ID
exports.updateSubmission = async (req, res) => {
  try {
    const { selections, endedAt } = req.body;

    const updatedSubmission = await Submission.findByIdAndUpdate(
      req.params.id,
      { selections, endedAt },
      { new: true, runValidators: true }
    );

    if (!updatedSubmission || updatedSubmission.isDeleted) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        submission: updatedSubmission,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Delete a submission by ID (soft delete)
exports.deleteSubmission = async (req, res) => {
  try {
    const deletedSubmission = await Submission.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!deletedSubmission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Submission deleted successfully',
      data: {
        submission: deletedSubmission,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get all submissions for a test
exports.getAllSubmissionsForTest = async (req, res) => {
  try {
    const { testId } = req.params;
    const submissions = await Submission.find({ testId, isDeleted: false }); // Check for non-deleted submissions

    res.status(200).json({
      status: 'success',
      data: {
        submissions,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get all submissions by a user
exports.getAllSubmissionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const submissions = await Submission.find({ userId, isDeleted: false }); // Check for non-deleted submissions

    res.status(200).json({
      status: 'success',
      data: {
        submissions,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
