
class UserGateway {
    constructor({UserModel,UserProjectModel,authentication,userSequelizer,userProjectSequelizer}){
        this.UserModel = UserModel
        this.UserProjectModel = UserProjectModel
        this.authentication = authentication
        this.userSequelizer = userSequelizer
        this.userProjectSequelizer = userProjectSequelizer
    }

    async findByUsername(user){
        const {username} = user;
        const result = await this.UserModel.findOne({username:username});
        return result;
    }
    async login(user) {
        let result = await this.findByUsername(user)
        if(result && this.userSequelizer.isMatched(user.password,result)) {
            result = this.userSequelizer.toEntity(result).toJSON();     
            return this.authentication.sign(result);  
        }
        return { message: 'User does not exist' }
    }
    
    async createUser(user) {
        const check = await this.findByUsername(user)
        if(check) return { message: 'User is existed' }
        const result = await this.UserModel.insertMany(await this.userSequelizer.toDatabase(user));
        return result.map(this.userSequelizer.toEntity);         
    }
    async deleteUser(user){
        const result =await this.UserModel.deleteOne( this.userSequelizer.getById(user));
        return this.userSequelizer.toEntity(result);         
    }
    async editUser(user){
        const result = await this.UserModel.updateOne(this.userSequelizer.getById(user),await this.userSequelizer.toDatabase(user));
        return this.userSequelizer.toEntity(user);       
    }
    async list(user){
        const result = await this.UserModel.find();
        return result.map(this.userSequelizer.toEntity)
    }
    async get(user) {
        const result = await this.findByUsername(user);
        if(result) return this.userSequelizer.toEntity(result);
        return { message: 'User does not exist' }
    }
    async getUserByProject(data){
        const result = await this.UserProjectModel.aggregate(this.userProjectSequelizer.joinUser(data));   
        return result.map(this.userSequelizer.toEntity);
    }
}

module.exports = UserGateway;