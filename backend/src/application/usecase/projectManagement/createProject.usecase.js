
class CreateProject{
     constructor({projectGateway}){
              this.projectGateway = projectGateway;
     }

     async execute(data){
        const result = await  this.projectGateway.create(data);
        return result;
     }
}

module.exports = CreateProject;