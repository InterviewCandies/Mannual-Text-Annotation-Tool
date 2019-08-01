const ProjectGateway = require('../../../infra/gateway/project.gateway');
class DeleteProject {
      constructor(){
            this.deleteProject = new ProjectGateway();
      }
      async execute(data){
          const {id} = data;
          const  result = this.deleteProject.deleteProject({id});
          return result;
      }
}

module.exports = DeleteProject;