const ProjectGateway = require('../../../infra/gateway/project.gateway');

class UpdateProject{
     constructor(){
            this.projectGateway= new ProjectGateway();
     }
     async execute(data){
          const result = await this.projectGateway.updateProject(data);
          return result;
            
     }
}

module.exports = UpdateProject;