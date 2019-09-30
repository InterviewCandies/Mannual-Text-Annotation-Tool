const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.mongo

const document = new Schema({
  project_id: {
    type: ObjectId,
    required: true,
  },
  content: {
    type: String,
  },
  status: {
    type: Number,
    default: 0,
  },
  history: {
    type: Array,
    default: [],
  },
  labels: {
    type: Array,
    default: [],
  },
  user: {
    type: ObjectId,
  },
  admin: {
     type: ObjectId
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
module.exports = mongoose.model('Document', document);
