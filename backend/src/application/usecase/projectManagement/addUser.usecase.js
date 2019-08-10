class AddProject{
    constructor({projectGateway}){
        this.projectGateway = projectGateway;
    }
    async execute(data){
         const result = this.projectGateway.addUser(data);
         return result;
    }
}

module.exports = AddProject;