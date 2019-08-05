const Project = require('../../domain/Project');
const ProjectModel = require('../database/project.model');
const UserProjectModel = require('../database/user_project.model')

class ProjectGateway{
    
    constructor(){
       // this.projectModel = new ProjectModel()
       
    }
    
    async createProject(data){
           const {project_name,project_description} = data;
           
           const project = {
                 project_name:project_name,
                 project_description:project_description
           };

           const result = await ProjectModel.insertMany(project);
           return result;
    }

    
    async updateProject(data){
           const {id,project_name,project_description} = data;


           const project = {
               project_name:project_name,
               project_description:project_description,
               updated_at: Date.now()
           }
           const result = await ProjectModel.updateOne({_id:id},project);
           return result;
    }
    async deleteProject(data){
        const {id} = data;
        const result = await ProjectModel.deleteOne({_id:id});
        return result;

    }
    async listProject(){
        const result = await ProjectModel.find();
        return result;   
    }
    async addUser(data){
        const {user_id,project_id}=data;
        const result = await UserProjectModel.insertMany({
                user_id : user_id,
                project_id: project_id
        })
        return result;
    }
}

module.exports = ProjectGateway;