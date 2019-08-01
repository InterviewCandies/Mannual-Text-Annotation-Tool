const ProjectGateway = require('../../../infra/gateway/project.gateway');
class ListProject {
      constructor(){
            this.listProject = new ProjectGateway();
      }
      async execute(){
          const result = this.listProject.listProject();
          return result;
      }
}

module.exports = ListProject;