const UserGateway = require('../../../infra/gateway/user.gateway');

class DeleteUser{
      constructor(){
            this.userGateway = new UserGateway();
      } 
      async execute(data){
            const {id} = data;
            const result = this.userGateway.deleteUser({id});
            return result;
      }
}

module.exports = DeleteUser;