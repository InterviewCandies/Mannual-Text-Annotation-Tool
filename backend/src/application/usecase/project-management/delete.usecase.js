class DeleteProject {
      constructor({projectGateway}){
            this.projectGateway =projectGateway;
      }
      async execute(id){
        const project = await this.projectGateway.findById(id)
        const  result = await this.projectGateway.delete(project.id);
        return result;
      }
}

module.exports = DeleteProject;