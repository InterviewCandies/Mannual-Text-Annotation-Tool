const ProjectModel = require('../database/project.modal');
const Project = require('../../domain/Project');
const IDCheck = require('./IDChecker')

class ProjectGateway{
    
    async createProject(data){
           const {project_name,project_description} = data;
           
           const project =new ProjectModel({
                 project_name:project_name,
                 project_description:project_description
           });

           const result = await ProjectModel.insertMany(project);
           return result;
    }

    
    async updateProject(data){
           const {id,project_name,project_description} = data;

           if ( IDChecker(id) ) return {};

           const project = {
               project_name:project_name,
               project_description:project_description,
               updated_at: Date.now()
           }
           const result = await ProjectModel.update({_id:id},project);
           return result;
    }
    async deleteProject(data){
        const {id} = data;
        if ( IDChecker(id) ) return {};
        const result = await ProjectModel.deleteOne({_id:id});
        return result;

    }
    async listProject(){
        const result = await ProjectModel.find();
        return result;   
    }
}

module.exports = ProjectGateway;