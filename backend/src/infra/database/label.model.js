const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Label = new Schema({
    content: {
        type:String,
        required:true
    },
    color:{
        type:String,
        default: "#FFFFFF"
    },
    shortcut:{
        type:String
    },
    project_id:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now()
    },
    updated_at:{
        type:String,
        default:Date.now()
    }

})

module.exports = mongoose.model('Label',Label);