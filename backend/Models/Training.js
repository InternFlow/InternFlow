const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const trainingSchema = new mongoose.Schema({
  name: { type: String, required: true},
  trainer:{
    type:Schema.Types.ObjectId,
    ref:"User"
   },
Participatrion_InternId: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]

});

const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;