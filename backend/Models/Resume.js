const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const resumeSchema = new mongoose.Schema({
    description: { type: String},
    filePath: { type: String},

    educations: [{
        schoolName: { type: String },
        degree: { type: String},
        description: { type: String },
        startDate: { type: Date },
        endDate: { type: Date }
      }],
      experiences: [{
        jobTitle: { type: String},
        company: { type: String },
        description: { type: String },
        startDate: { type: Date },
        endDate: { type: Date }
      }],
      skills: [{ type: String }],

 candidacy:{
  type:Schema.Types.ObjectId,
  ref:"Candidacy"
 }
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;