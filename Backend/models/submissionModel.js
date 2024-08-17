const mongoose = require('mongoose');
const { Schema } = mongoose;

const selectionSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
  option: { type: String },
  savedAt: { type: Date, default: Date.now }
});

const submissionSchema = new Schema({
  testId: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  selections: [selectionSchema],
  endedAt: { type: Date },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);
