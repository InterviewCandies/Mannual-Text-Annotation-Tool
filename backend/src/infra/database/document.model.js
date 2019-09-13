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
           default:"Not Verified"
      },
      labels:{
          type: Array,
          default : []
      },
      user: {
          type: ObjectId
      },
      created_at:{
          type: String,
          default: new Date().toLocaleString()
      },
      updated_at:{
          type: String,
          default: new Date().toLocaleString()
      }
})
module.exports = mongoose.model('Document',document);