const moogose = require('mongoose');
const Schema = moogose.Schema;
const project = new Schema({
      project_name:{
          type:String,
          required:true
      },
      project_description:{
          type:String
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
module.exports = moogose.model('project',project);