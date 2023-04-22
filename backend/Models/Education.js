const mongoose = require('mongoose');
const User = require('./User');

const educationSchema = new mongoose.Schema({
  university: { type: String, required: false},
  speciality: { type: String, required: false },
  start: { type: Date},
  end:{ type:Date },
  inetrn:{type:mongoose.Schema.Types.ObjectId, ref:'User'}
});

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;