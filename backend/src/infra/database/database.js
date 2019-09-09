const moogoose = require('mongoose')
const config = require('../../config')

moogoose.connect(config.connectedString,
        {useNewUrlParser:true});
const connection = moogoose.connection;
connection.once('open',()=>{
    console.log('moongose is running');
})

module.exports = connection;