const express = require('express');
const config = require('config')
const path = require('path')

class Server {
  constructor({ router }) {
    this.express = express();
    this.express.use(router);
    this.express.use('/files',express.static('files'));
  }

  start() {
    const PORT = config.get('Server.PORT')
    const server = this.express.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port: ${PORT}`);
    })
    server.timeout = config.get('Server.TIMEOUT')
  }
}

module.exports = Server;
