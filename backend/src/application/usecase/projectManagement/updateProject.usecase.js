const ProjectGateway = require('../../../infra/gateway/project.gateway');

class UpdateProject{
     constructor(){
            this.projectGateway= new ProjectGateway();
     }
     async execute(data){
          const {id,project_name,project_description} = data;
       
          const result = await this.projectGateway.updateProject({id,project_name,project_description});
          return result;
            
     }
}

module.exports = UpdateProject;