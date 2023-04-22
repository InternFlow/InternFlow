const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const candidacySchema = new mongoose.Schema({
 offer:{
  type:Schema.Types.ObjectId,
  ref:"Offer"
 },
 dateApply: { type: Date},
 status: { type: String},
 resumeType: { type: String},

 description: { type: String},
 lettre: { type: String},

 intern:{
  type:Schema.Types.ObjectId,
  ref:"User"
 }
 , resume:{
  type:Schema.Types.ObjectId,
  ref:"Resume"
 }
});

const Candidacy = mongoose.model('Candidacy', candidacySchema);

module.exports = Candidacy;