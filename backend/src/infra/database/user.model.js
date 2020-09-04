const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true,
  },
  created_at: {
    type: String,
    default: new Date().toLocaleString(),
  },
  updated_at: {
    type: String,
    default: new Date().toLocaleString(),
  },

}, { collation: { locale: 'en' } });

module.exports = mongoose.model('User', User);
