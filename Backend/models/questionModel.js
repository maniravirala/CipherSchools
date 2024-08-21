const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String }], // Array of options
  testId: { type: Schema.Types.ObjectId, ref: 'Test',},
  marks: { type: Number, required: true },
  section: { type: String, default: 'General' },
  correctOption: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);
