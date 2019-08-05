const ProjectGateway = require('../../../infra/gateway/project.gateway')
class ListProject {
      constructor(){
              this.projectGateway = new ProjectGateway();
      }
      async execute(){
          const result = this.projectGateway.listProject();
          return result;
      }
}

module.exports = ListProject;