
class DeleteUser{
      constructor({userGateway}){
            this.userGateway = userGateway
      } 
      async execute(data){
            const result = await this.userGateway.delete(data);
            return result;
      }
}

module.exports = DeleteUser;