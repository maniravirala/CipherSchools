const mongoose = require('mongoose');
const { Schema } = mongoose;

const testSchema = new Schema({
  title: { type: String, required: true },
  descriptions: { type: String },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }], // Array of Question ObjectIds
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Test', testSchema);
