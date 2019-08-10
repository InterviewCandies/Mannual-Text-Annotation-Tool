
class UpdateProject{
     constructor({projectGateway}){
            this.projectGateway= projectGateway;
     }
     async execute(data){
          const result = await this.projectGateway.updateProject(data);
          return result;
            
     }
}

module.exports = UpdateProject;