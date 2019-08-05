const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProject = new Schema({
      user_id:{
          type:String,
          required:true
      },
      project_id:{
          type:String,
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