
class UserGateway {
    constructor({UserModel,UserProjectModel,authentication,userMapper,userProjectMapper}){
        this.UserModel = UserModel
        this.UserProjectModel = UserProjectModel
        this.authentication = authentication
        this.userMapper = userMapper
        this.userProjectMapper = userProjectMapper
    }

    async findByUsername(user){
        const {username} = user;
        const result = await this.UserModel.findOne({username:username});
        return result;
    }
    async login(user) {
        let result = await this.findByUsername(user)
        if(result && this.userMapper.isMatched(user.password,result)) {
            result = this.userMapper.toEntity(result).toJSON();     
           
        }
        else result= { message: 'User does not exist' }
        return this.authentication.sign(result)
    }
    
    async create(data) {
        const check = await this.findByUsername(data)
        if(check) return { message: 'User is existed' }

        const user =await  this.userMapper.toDatabase(data)
        const result = await this.UserModel.insertMany(user);
        return result.map(this.userMapper.toEntity);         
    }
    async delete(data){
        const {id} = data
        const result =await this.UserModel.deleteOne({_id:id});
        return result.deletedCount==1    
    }
    async edit(data){
        const {id} =data
        const user = await this.userMapper.toDatabase(data)
        const result = await this.UserModel.updateOne({_id:id},user);
        return result.nModified==1;    
    }
    async list(user){
        const result = await this.UserModel.find();
        return result.map(this.userMapper.toEntity)
    }
    async get(user) {
        const result = await this.findByUsername(user);
        if(result) return this.userMapper.toEntity(result);
        return { message: 'User does not exist' }
    }
    async getUserByProject(data){
        const result = await this.UserProjectModel.aggregate(this.userProjectMapper.joinUser(data));   
        return result.map(this.userMapper.toEntity);
    }
}

module.exports = UserGateway;