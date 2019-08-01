const Server = require('./infra/webserver/Server');
const config = require('./config');
const router = require('./infra/webserver/Router')();

const app = new Server({config:config,router:router});
app.start();