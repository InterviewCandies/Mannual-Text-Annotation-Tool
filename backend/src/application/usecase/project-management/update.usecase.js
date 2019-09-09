
class UpdateProjectUseCase{
     constructor({projectGateway}){
            this.projectGateway= projectGateway;
     }
     async execute(id,project_name,project_description){
          //check params 
          let project =await this.projectGateway.findById(id);
          //Change properties
          project.project_name = project_name
          project.project_description = project_description

          const updatedProject = await this.projectGateway.update(project);
          return updatedProject;
            
     }
}

module.exports = UpdateProjectUseCase;