
class CreateProjectUseCase{
     constructor({projectGateway}){
              this.projectGateway = projectGateway;
     }

     async execute(project_name,project_description){
        //Check project_name, description 
        const entity = {
                        project_name: project_name,
                        project_description : project_description
                       }
        const project = await  this.projectGateway.create(entity);
        return project;
     }
}

module.exports = CreateProjectUseCase;