class DeleteProject {
      constructor({projectGateway}){
            this.deleteProject =projectGateway;
      }
      async execute(data){
          const  result = this.deleteProject.deleteProject(data);
          return result;
      }
}

module.exports = DeleteProject;