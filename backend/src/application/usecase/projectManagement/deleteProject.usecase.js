class DeleteProject {
      constructor({projectGateway}){
            this.projectGateway =projectGateway;
      }
      async execute(data){
          const  result = this.projectGateway.delete(data);
          return result;
      }
}

module.exports = DeleteProject;