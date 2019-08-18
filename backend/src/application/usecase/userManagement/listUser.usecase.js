
class ListUser {
   constructor({userGateway}){
     this.userGateway = userGateway
   }
   async execute(data){
         const result = await this.userGateway.list(data);
         return result;
   }

}

module.exports = ListUser