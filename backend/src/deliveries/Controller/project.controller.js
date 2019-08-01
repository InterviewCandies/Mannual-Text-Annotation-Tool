const CreateProject = require('../../application/usecase/projectManagement/createProject.usecase') 
const UpdateProject = require('../../application/usecase/projectManagement/updateProject.usecase')
const DeleteProject = require('../../application/usecase/projectManagement/deleteProject.usecase')
const ListProject = require('../../application/usecase/projectManagement/listProject.usecase')
module.exports = {
     async list(req,res){
           this.listProject = new ListProject();
           const result  = await this.listProject.execute();
           try {
                res.status(200).json(result);
           } catch (error) {
                res.status(400).json(error);
           }
     }, 
     async createProject(req,res){
          const {project_name,project_description} = req.body;

          this.createProject  = new CreateProject();

          const result = await this.createProject.execute({project_name,project_description});
          try{
               res.status(200).json("OK");  

          } catch(e){
               res.status(400).send(error);
          }

     },
     async updateProject(req,res) {
          const id = req.params.id;
          const {project_name,project_description} = req.body;
            
           this.updateProject = new UpdateProject();

           const result = await this.updateProject.execute({id,project_name,project_description});
           try {
                   res.status(200).json(result);
           } catch (error) {
                res.status(400).json(error);
           }
     },
     async deleteProject(req,res){
           const id = req.params.id;
           this.deleteProject = new DeleteProject();
           const result = await this.deleteProject.execute({id});
           try{
               res.status(200).json(result);
           }
           catch(error){
               res.status(400).json(error);
           }
     }
}