const mongoose = require('mongoose');
const User = require('./User');

const skillsSchema = new mongoose.Schema({
  name: { type: String, required: true},
  inetrn:{type:mongoose.Schema.Types.ObjectId, ref:'User'}
});

const Skills = mongoose.model('Skills', skillsSchema);

module.exports = Skills;