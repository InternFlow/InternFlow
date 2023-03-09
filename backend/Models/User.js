const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['formateur', 'company', 'admin','condidat'], default: 'condidat' },
  confirmed:{ type:Boolean},
  educations:[{type: mongoose.Schema.Types.ObjectId, ref:'Education'}],
  experiences:[{type: mongoose.Schema.Types.ObjectId, ref:'Experience'}],
  skills:[{type: mongoose.Schema.Types.ObjectId, ref:'Skills'}],
  categories: [{ type: mongoose.Types.ObjectId, ref: 'Category' }],
  companies: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  interns: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
});

userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
