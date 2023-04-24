const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Question = require('./Question');

const quizSchema = new Schema({
  name: { type: String },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }],
  scoremax:{type:Number,default:0},
  coefficient: { type: Number},
  timeout: { type: Number, }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;