
class UpdateProject{
     constructor({projectGateway}){
            this.projectGateway= projectGateway;
     }
     async execute(data){
          const result = await this.projectGateway.update(data);
          return result;
            
     }
}

module.exports = UpdateProject;