const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  text: { type: String, required: true },
  choices: [{ type: String, required: true }],
  correctChoice: { type: String, required: true },
  score: { type: Number, required: true },
});

module.exports = mongoose.model('Question', questionSchema);