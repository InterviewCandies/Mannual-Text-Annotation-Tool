const moogose = require('mongoose');

const { Schema } = moogose;

const project = new Schema({
  project_name: {
    type: String,
    required: true,
  },
  project_description: {
    type: String,
  },
  users: {
    type: Array,
    default: [],
  },
  created_at: {
    type: String,
    default: new Date().toLocaleString(),
  },
  updated_at: {
    type: String,
    default: new Date().toLocaleString(),
  },
}, { collation: { locale: 'en' } })
module.exports = moogose.model('project', project);
