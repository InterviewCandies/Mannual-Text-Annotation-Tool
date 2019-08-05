const express = require('express');
class Server {
    constructor({config,router}){
        this.config=config;
        this.express=express();
        this.express.use(router);
        process.env.SECRET_KEY = config.SECRET_KEY;
    }
    start(){
        this.express.listen(this.config.PORT,()=>{
                console.log('Server is running on port:' + this.config.PORT);
        }); 
    }
}

module.exports = Server;
