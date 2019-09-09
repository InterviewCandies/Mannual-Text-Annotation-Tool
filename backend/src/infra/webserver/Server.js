const express = require('express');
const path = require('path')
class Server {
    constructor({config,router}){
        this.config=config;
        this.express=express();
        this.express.use(router);
    }
    start(){
        this.express.listen(this.config.PORT,"0.0.0.0",()=>{
                console.log('Server is running on port:' + this.config.PORT);
        }); 
    }
}

module.exports = Server;
