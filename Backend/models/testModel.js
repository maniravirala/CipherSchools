const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question', // Reference to the Question model
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
