class GetUserByProject{
    constructor({userGateway}){
        this.userGateway = userGateway; 
    }
    async execute(data){
         const result = await this.userGateway.getUserByProject(data);
         return result;
    }
}

module.exports = GetUserByProject