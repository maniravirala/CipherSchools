const Submission = require('../models/submissionModel');

exports.createSubmission = async (req, res) => {
  try {
    const newSubmission = await Submission.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        submission: newSubmission
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getSubmissionByTestAndUser = async (req, res) => {
  try {
    const { testId, userId } = req.params;
    const submission = await Submission.findOne({ testId, userId });
    if (!submission) {
      return res.status(404).json({
        status: 'fail',
        message: 'Submission not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        submission
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
