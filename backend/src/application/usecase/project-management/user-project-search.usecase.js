class UserProjectSearchUseCase {
    constructor({projectGateway,userGateway}){
       this.projectGateway= projectGateway
       this.userGateway = userGateway
    }
    async execute(user_id,page,perPage,searchKey){
       const user = await this.userGateway.findById(user_id)
       const projects= await this.projectGateway.userProjectSearch(user.username,page,perPage,searchKey);
       return projects;
    }
}

module.exports = UserProjectSearchUseCase