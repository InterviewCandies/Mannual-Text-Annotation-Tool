class EditUser{
   constructor({userGateway}){
       this.userGateway = userGateway;
   }
   async execute(data){
         const result =await this.userGateway.edit(data);
         return result;
   }
} 

module.exports = EditUser;