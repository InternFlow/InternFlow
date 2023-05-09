const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  link: { type: String },
  offreid:{ type: String }
});

const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['formateur', 'company', 'admin','condidat','new'], default: 'condidat' },
  confirmed: { type: Boolean ,default:true},
  
  pfpPath: { type: String , default: "https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-4-1024x1024.jpg" },
  bannerPath: { type: String },
  educations: [{
    schoolName: { type: String },
    degree: { type: String},
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
  }],
  experiences: [{
    jobTitle: { type: String},
    company: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String }
  }],
  occupation: {type:String},
  skills: [{ type: String }],
  local: [{ type: String }],
  companies: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  interns: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  uploadedFiles: [{ type: String }],
  date:{ type:Date },
  phoneNumber:{ type:Number},
  description: { type: String},
  linkedinId: {type:String},
  

  confirmationToken: { type: String },
  confirmExpiration: { type: Date },
  OfferIdC: [{
    type: Schema.Types.ObjectId,
    ref: 'Offer'
  }],
  OfferIdI: [{
    type: Schema.Types.ObjectId,
    ref: 'Offer'
  }],
  notifications: [notificationSchema]

});


userSchema.methods.hashPassword = async function (newPassword) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    this.password = hash;
    await this.save();
  } catch (error) {
    throw error;
  }
};

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
