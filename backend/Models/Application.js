const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'},
  name: { type: String, required: true },
  score: { type: Number, default: 0, required: true },
});

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  offer: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    required: true,
  },
  statusQuiz: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    required: true,
  },
  quizScores: [
    {
      quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
      name: { type: String, required: true },
      score: { type: Number, default: 0, required: true },
    }
  ],
  interviewScheduled: { type: Date },
});

module.exports = mongoose.model('Application', applicationSchema);
