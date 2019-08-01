const ProjectGateway = require('../../../infra/gateway/project.gateway');

class CreateProject{
     constructor(){
              this.projectGateway = new ProjectGateway();
     }

     async execute(projectInfo){
        const {project_name,project_description} = projectInfo;
        const result = await  this.projectGateway.createProject({project_name,project_description});
        return result;
     }
}

module.exports = CreateProject;