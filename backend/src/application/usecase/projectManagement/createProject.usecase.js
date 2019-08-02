const ProjectGateway = require('../../../infra/gateway/project.gateway');

class CreateProject{
     constructor(){
              this.projectGateway = new ProjectGateway();
     }

     async execute(data){
        const result = await  this.projectGateway.createProject(data);
        return result;
     }
}

module.exports = CreateProject;