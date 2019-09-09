
class DeleteUserUseCase{
      constructor({userGateway}){
            this.userGateway = userGateway
      } 
      async execute(id){
            const user = await this.userGateway.findById(id)
            const result = await this.userGateway.delete(user);
            return result;
      }
}

module.exports = DeleteUserUseCase;