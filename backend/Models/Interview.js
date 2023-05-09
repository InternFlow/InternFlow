const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const interviewSchema = new mongoose.Schema({
  name: { type: String, required: true},
  CompanyId:{
    type:Schema.Types.ObjectId,
    ref:"User"
   },
   InternId: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]

});
const Interview = mongoose.model('Interview', interviewSchema);
module.exports = Interview;