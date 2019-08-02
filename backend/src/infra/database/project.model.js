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
          type: Date,
          default: Date.now()
      },
      updated_at:{
          type: Date,
          default: Date.now()
      }
})

module.exports = moogose.model('project',project);