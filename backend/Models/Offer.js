const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Quiz = require('./Quiz');

const offerSchema = new Schema({
  name: { type: String, required: true },
  company: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  quizzes: [{
    type: Schema.Types.ObjectId,
    ref: "Quiz"
  }]
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
