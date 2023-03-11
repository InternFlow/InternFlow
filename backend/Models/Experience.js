const mongoose = require('mongoose');
const User = require('./User');

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true},
  description: { type: String },
  start: { type: Date},
  end:{ type:Date },
  inetrn:{type:mongoose.Schema.Types.ObjectId, ref:'User'}
});

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;