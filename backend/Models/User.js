const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['formateur', 'company', 'condidat'], default: 'condidat' },
  confirmed: { type: Boolean },
  educations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Education' }],
  experiences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }],
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skills' }],
  categories: [{ type: mongoose.Types.ObjectId, ref: 'Category' }],
  companies: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  interns: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  uploadedFiles: [{ type: String }]
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
