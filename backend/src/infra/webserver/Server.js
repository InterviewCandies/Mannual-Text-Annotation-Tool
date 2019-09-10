const express = require('express');
const config = require('config')
class Server {
    constructor({router}){
        this.express=express();
        this.express.use(router);
    }
    start(){
        const PORT = config.get('Server.PORT')
        this.express.listen(PORT,"0.0.0.0",()=>{
                console.log('Server is running on port:' + PORT);
        }); 
    }
}

module.exports = Server;
