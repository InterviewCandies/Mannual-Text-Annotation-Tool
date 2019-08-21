const mongoose = require('mongoose')
const Schema  = mongoose.Schema;
const ObjectId = mongoose.mongo.ObjectID
const LabelDocument = new Schema({
      label_id :{
          type : ObjectId,
          required : true
      },
      document_id : {
          type : ObjectId,
          required : true
      },
      user_id : {
           type : ObjectId,
           required : true
      },
      created_at : {
            type : String,
            default : Date()
      },    
      updated_at : {
            type : String,
            default : Date()
      }
})

module.exports = mongoose.model('label_document',LabelDocument)