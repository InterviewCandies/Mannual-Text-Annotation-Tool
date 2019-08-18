class UserSearchProject {
    constructor({projectGateway}){
       this.projectGateway= projectGateway
    }
    async execute(data){
       const result= this.projectGateway.userSearchProject(data);
       return result;
    }
}

module.exports = UserSearchProject