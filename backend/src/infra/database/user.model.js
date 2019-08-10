const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
      username:{
          type: String,
          required: true
      },
      password:{
          type: String,
          required: true
      },
      role:{
          type: Number,
          required: true
        },
      created_at:{
          type: Date,
          default: Date.now()
      },
      updated_at:{
           type: Date,
           default: Date.now()
      }

});

module.exports = mongoose.model('Users',Users);