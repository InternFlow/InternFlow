const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const candidacySchema = new mongoose.Schema({
 offer:{
  type:Schema.Types.ObjectId,
  ref:"Offer"
 },
 dateApply: { type: Date},
 status: {type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    required: true,},
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
 interviewScheduled: { 
   date: { type: Date },
   time: { type: String },
   duration: { type: Number }, // duration in minutes
   location: { type: String }
 }
});

const Candidacy = mongoose.model('Candidacy', candidacySchema);

module.exports = Candidacy;