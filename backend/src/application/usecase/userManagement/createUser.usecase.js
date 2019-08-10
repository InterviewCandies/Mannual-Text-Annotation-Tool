
class CreateUser {
       constructor({userGateway}){
            this.userGateway = userGateway
       }
       async execute(data){
            const result = await this.userGateway.createUser(data);
            return result;      
       }
}

module.exports = CreateUser;