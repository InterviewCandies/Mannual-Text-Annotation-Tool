const moogoose = require('mongoose')
const config = require('config')

moogoose.connect(config.get('Db.connectedString'),
  { useNewUrlParser: true });
const { connection } = moogoose;


connection.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('moongose is running');

})

module.exports = connection;
