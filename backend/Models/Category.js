const mongoose = require('mongoose');
const User = require('./User');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true},

});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;