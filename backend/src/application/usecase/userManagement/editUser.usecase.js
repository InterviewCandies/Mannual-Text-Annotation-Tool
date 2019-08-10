class EditUser{
   constructor({userGateway}){
       this.userGateway = userGateway;
   }
   async execute(data){
         const result =await this.userGateway.editUser(data);
         return result;
   }
} 

module.exports = EditUser;