const Project = require('../../application/usecase/projectManagement')
module.exports = {
     async list(req,res){
           this.listProject = new Project.ListProject();
           const result  = await this.listProject.execute();
           try {
                res.status(200).json(result);
           } catch (error) {
                res.status(400).json(error);
           }
     }, 
     async createProject(req,res){
          const {project_name,project_description} = req.body;

          this.createProject  = new Project.CreateProject();

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
            
           this.updateProject = new Project.UpdateProject();

           const result = await this.updateProject.execute({id,project_name,project_description});
           try {
                   res.status(200).json(result);
           } catch (error) {
                res.status(400).json(error);
           }
     },
     async deleteProject(req,res){
           const id = req.params.id;
           this.deleteProject = new Project.DeleteProject();
           const result = await this.deleteProject.execute({id});
           try{
               res.status(200).json(result);
           }
           catch(error){
               res.status(400).json(error);
           }
     },
     async addUser(req,res){
           const project_id = req.params.id;
           const {user_id} = req.body;
           this.addUser = new Project.AddUser();
           const result =await this.addUser.execute({user_id,project_id});
           try {
                res.status(200).json(result);
           } catch (error) {
                res.status(400).json(error);
           }
     }
}