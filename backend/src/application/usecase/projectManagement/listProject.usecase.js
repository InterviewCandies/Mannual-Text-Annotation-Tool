class ListProject {
      constructor({projectGateway}){
              this.projectGateway = projectGateway;
      }
      async execute(data){
          const result = this.projectGateway.listProject(data);
          return result;
      }
}

module.exports = ListProject;