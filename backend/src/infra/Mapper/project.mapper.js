const Project = require('../../domain/Project')
module.exports = class ProjectMapper{
       toEntity(data){
            const {_id,project_name,project_description,created_at,updated_at} = data;
            return new Project(_id,project_name,project_description,created_at,updated_at);
       }
       toDatabase(data){
            const {project_name,project_description} = data;
            return {
                project_name:project_name,
                project_description,project_description,
                updated_at : Date()
            }
       }
       
      
     
}