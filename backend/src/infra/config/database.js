const moogoose = require('mongoose')


moogoose.connect('mongodb+srv://Thang:Voquocthang1999@text-annotation-g9uqn.mongodb.net/TextAnnotation?retryWrites=true&w=majority',
        {useNewUrlParser:true});
const connection = moogoose.connection;
connection.once('open',()=>{
    console.log('moongose is running');
})

module.exports = connection;