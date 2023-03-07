const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    name: String,
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    password: String,
    role: String,
}, {
    timestamps: true,
   }
);



module.exports = mongoose.model('users', UserModel);