
class ListUser {
   constructor({userGateway}){
     this.userGateway = userGateway
   }
   async execute(data){
     console.log(data)
         const result = await this.userGateway.list(data);
         return result;
   }

}

module.exports = ListUser