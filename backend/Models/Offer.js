const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;
const Category = require('./Category');

const offerSchema = new mongoose.Schema({
  name: { type: String, required: true},
 company:{
  type:Schema.Types.ObjectId,
  ref:"User"
 },
 category:{
  type:Schema.Types.ObjectId,
  ref:"Category"
 }
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;