const UserGateway = require('../../../infra/gateway/user.gateway')
class EditUser{
   constructor(){
       this.userGateway = new UserGateway();
   }
   async execute(data){
         const result =await this.userGateway.editUser(data);
         return result;
   }
} 

module.exports = EditUser;