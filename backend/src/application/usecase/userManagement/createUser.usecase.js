const UserGateway = require('../../../infra/gateway/user.gateway');

class CreateUser {
       constructor(){
            this.userGateway = new UserGateway();
       }
       async execute(data){
            const {username,password,role} = data;
            const result = await this.userGateway.createUser({username,password,role});
            return result;      
       }
}

module.exports = CreateUser;