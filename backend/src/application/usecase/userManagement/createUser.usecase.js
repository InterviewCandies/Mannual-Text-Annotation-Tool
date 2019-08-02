const UserGateway = require('../../../infra/gateway/user.gateway');

class CreateUser {
       constructor(){
            this.userGateway = new UserGateway();
       }
       async execute(data){
            const result = await this.userGateway.createUser(data);
            return result;      
       }
}

module.exports = CreateUser;