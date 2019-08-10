class ProjectGateway{
    
    constructor({ProjectModel,UserProjectModel,projectSequelizer,userProjectSequelizer}){
       this.ProjectModel = ProjectModel
       this.UserProjectModel = UserProjectModel
       this.projectSequelizer = projectSequelizer
       this.userProjectSequelizer = userProjectSequelizer
    }
    
    async createProject(data){
           const result = await this.ProjectModel.insertMany(this.projectSequelizer.toDatabase(data));
           return result.map(this.projectSequelizer.toEntity);
    }

    
    async updateProject(data){
           const result = await this.ProjectModel.updateOne(this.projectSequelizer.getById(data),this.projectSequelizer.toDatabase(data));
           return this.projectSequelizer.toEntity(result);
    }
    async deleteProject(data){
        const result = await this.ProjectModel.deleteOne(this.projectSequelizer.getById(data));
        return this.projectSequelizer.toEntity(result);

    }
    async listProject(data){
        const result = await this.ProjectModel.find();
        return result.map(this.projectSequelizer.toEntity);   
    }
    async findUserById(data){
          return await this.UserProjectModel.findOne(this.userProjectSequelizer.toDatabase(data));
    }
    async addUser(data){
        const check = await this.findUserById(data);
        if(check) return {message : 'User is existed'};
        const result = await this.UserProjectModel.insertMany(this.userProjectSequelizer.toDatabase(data))
        return result;
    }
    async removeUser(data){
         const result = await this.UserProjectModel.deleteOne(this.userProjectSequelizer.toDatabase(data))
         return result;
    }
    async getProjectByUser(data){
        const result = await this.UserProjectModel.aggregate(this.userProjectSequelizer.joinProject(data));
        return result.map(this.projectSequelizer.toEntity);
    }
  
}

module.exports = ProjectGateway;