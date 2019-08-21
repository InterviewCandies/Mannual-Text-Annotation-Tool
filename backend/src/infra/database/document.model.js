const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.mongo.ObjectId
const document = new Schema({
      project_id:{
          type:ObjectId,
          required:true
      },
      content:{
          type:String
      },
      status:{
           type: String,
           default:"Not verified"
      },
      created_at:{
          type: String,
          default: Date()
      },
      updated_at:{
          type: String,
          default: Date()
      }
})
module.exports = mongoose.model('Document',document);