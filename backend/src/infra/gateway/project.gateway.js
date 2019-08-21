class ProjectGateway{
    
    constructor({ProjectModel,UserProjectModel,projectMapper,userProjectMapper}){
       this.ProjectModel = ProjectModel
       this.UserProjectModel = UserProjectModel
       this.projectMapper = projectMapper
       this.userProjectMapper = userProjectMapper
    }
    
    async create(req){
           const project =this.projectMapper.toDatabase(req.body)
           const result = await this.ProjectModel.insertMany(project);
           return result.map(this.projectMapper.toEntity);
    }

    
    async update(req){
           const id =req.params.id
           const project =this.projectMapper.toDatabase(req.body)
           const result = await this.ProjectModel.updateOne({_id:id},project);
           return result.nModified==1;
    }
    async delete(req){
        const id =req.params.id
        const result = await this.ProjectModel.deleteOne({_id:id});
        return result.deletedCount==1

    }
    async list(req){
        const page = req.params.id
        let {perPage,sortKey,trend} = req.body 
        perPage = Number(perPage)
        let filter ={}
        
        if(sortKey=='project_name') filter={ project_name : trend}
        else if(sortKey=='project_description') filter={ project_description: trend}
        else if(sortKey=='creared_at') filter={created_at : trend}
        else filter={updated_at: trend}

        const size = await this.ProjectModel.countDocuments()
        const result = await this.ProjectModel.find()
                                              .skip((perPage * page) - perPage)
                                              .limit(perPage)
                                              .sort(filter)
                                             
        return { size: size , projects : result.map(this.projectMapper.toEntity) };   
    }
    async search(req){
        const page = req.params.id
        let {perPage} = req.body 
        const {value} =req.body
        perPage = Number(perPage)
        const result =await this.ProjectModel.find(
                        {'$or' : [  
                                   {project_name: { "$regex":  value , "$options": "i" }},
                                   {project_description: { "$regex": value, "$options": "i" }},
                                   { created_at: { "$regex": value , "$options": "i" }},
                                   {updated_at: { "$regex": value , "$options": "i" }}    
                                 ]
                        } 
        ).skip((perPage * page) - perPage)
        .limit(perPage)
        const size = result.length
        return { size: size , projects : result.map(this.projectMapper.toEntity) };   
    }
    
    async checkUser(req){
        const obj = this.userProjectMapper.toDatabase(req.body)
        const check = await this.UserProjectModel.findOne(obj);
        return check
    }
    async addUser(req){
        if(await this.checkUser(req)) return {message:'User is existed'}
        const obj =this.userProjectMapper.toDatabase(req.body)
        const result = await this.UserProjectModel.insertMany(obj)
        return result;
    }
    async removeUser(req){
         const obj = this.userProjectMapper.toDatabase(req.body)
         const result = await this.UserProjectModel.deleteOne(obj)
         return result.deletedCount==1;
    }
    async userSearchProject(req){
        const page = req.params.id
        let {perPage} = req.body 
        perPage = Number(perPage)
        const query =this.userProjectMapper.search(req.body)
        
        let  count = query.slice(0);
        count.push({$count:"size"})
        const  result = await this.UserProjectModel.aggregate(query).skip((perPage * page) - perPage).limit(perPage)
        let size = await this.UserProjectModel.aggregate(count)
        size = (size.length!=0) ?size[0]['size']:0
        return {size , projects: result.map(this.projectMapper.toEntity)}
    }
    async getProjectByUser(req){
        const page = req.params.id
        let {perPage} = req.body 
        perPage = Number(perPage)
        const query =this.userProjectMapper.joinProject(req.body)
        let  count = query.slice(0);
        count.push({$count:"size"})
        const  result = await this.UserProjectModel.aggregate(query).skip((perPage * page) - perPage).limit(perPage)
        let size = await this.UserProjectModel.aggregate(count)
        size = (size.length!=0) ?size[0]['size']:0
        return {size, projects: result.map(this.projectMapper.toEntity)}
    }
  
}

module.exports = ProjectGateway;