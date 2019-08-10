const mongoose = require('mongoose');
const ObjectId = mongoose.mongo.ObjectId
const Schema = mongoose.Schema;
const UserProject = new Schema({
      user_id:{
          type:ObjectId,
          required:true
      },
      project_id:{
          type:ObjectId,
          required:true
      },
      created_at:{
          type:Date,
          default: Date.now()
      },
      updated_at:{
          type:Date,
          default:Date.now()
      }
})

module.exports = mongoose.model('UserProject',UserProject);