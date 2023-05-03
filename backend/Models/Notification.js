const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  link: { type: String },
  offreid:{ type: String },
  userR: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  userS: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  
  candidacy: {
    type: Schema.Types.ObjectId,
    ref: 'Candidacy'
  }
});




const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
