
class CreateProject{
     constructor({projectGateway}){
              this.projectGateway = projectGateway;
     }

     async execute(data){
        const result = await  this.projectGateway.createProject(data);
        return result;
     }
}

module.exports = CreateProject;