const mongoose = require('mongoose');

// define a schema for storing confirmation codes
const confirmationCodeSchema = new mongoose.Schema({
  code: { type: String, required: true },
  email: { type: String, required: true },
  isConfirmed: { type: Boolean, default: false }
});

const ConfirmationCode = mongoose.model('ConfirmationCode', confirmationCodeSchema);

// function for saving a confirmation code to the database
async function saveConfirmationCodeToDatabase(code, email) {
  const confirmationCode = new ConfirmationCode({ code, email });
  await confirmationCode.save();
}

// example usage
// saveConfirmationCodeToDatabase('internflow123', 'internflow.solutionsmakers@gmail.com');

module.exports = {
    saveConfirmationCodeToDatabase
}
