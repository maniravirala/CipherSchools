const mongoose = require('mongoose');
const { Schema } = mongoose;

const selectionSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  answer: { type: String, required: true },
  markedForReview: { type: Boolean, default: false },
  savedAt: { type: Date, default: Date.now }
});

const submissionSchema = new Schema({
  testId: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  selections: [selectionSchema],
  startedAt: { type: Date, default: Date.now },
  duration: { type: Number, required: true },
  endedAt: { type: Date },
  score: { type: Number }, // Field to store the score after evaluation
  isEvaluated: { type: Boolean, default: false }, // Flag to indicate if the submission has been evaluated
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);
