const ProjectGateway = require('../../../infra/gateway/project.gateway')
class AddProject{
    constructor(){
        this.projectGateway = new ProjectGateway();
    }
    async execute(data){
         const result = this.projectGateway.addUser(data);
         return result;
    }
}

module.exports = AddProject;