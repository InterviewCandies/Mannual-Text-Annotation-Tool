const mongoose = require('mongoose');

const { Schema } = mongoose;

const Label = new Schema({
  content: {
    type: String,
    required: true,
  },
  backgroundColor: {
    type: String,
    default: '#FFFFFF',
  },
  textColor: {
    type: String,
    default: '#000000',
  },
  shortcut: {
    type: String,
  },
  project_id: {
    type: String,
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
})

module.exports = mongoose.model('Label', Label);
