class UserGateway {
  constructor({ UserModel, ProjectModel, authentication, userMapper }) {
    this.UserModel = UserModel
    this.ProjectModel = ProjectModel
    this.authentication = authentication
    this.userMapper = userMapper
  }

  async findByUsername(username) {
    const user = await this.UserModel.findOne({ username });
    if (user) return this.userMapper.toEntity(user)
    return false
  }

  async findById(id) {
    const user = await this.UserModel.findById({ _id: id })
    return this.userMapper.toEntity(user)
  }


  async login(username, password) {
    let user = await this.findByUsername(username)
    if (user && await this.userMapper.isMatched(password, user)) {
      user = JSON.stringify(user)
      return this.authentication.sign(user)
    }
    return false
  }

  async create(entity) {
    const dbItem = await this.userMapper.toDatabase(entity)
    const user = await this.UserModel.insertMany(dbItem);
    return user.map(this.userMapper.toEntity);
  }


  async delete(entity) {
    const result = await this.UserModel.deleteOne({ _id: entity.id });
    if (result.deletedCount) await this.ProjectModel.updateMany({}, { $pull: { users: { id: entity.id } } })
    // eslint-disable-next-line eqeqeq
    return result.deletedCount == 1
  }


  async edit(entity) {
    const dbItem = await this.userMapper.toDatabase(entity)
    await this.UserModel.updateOne({ _id: entity.id }, dbItem);
    const updatedUser = await this.findById(entity.id)
    const query = {
      users: {
        $elemMatch: {
          id: updatedUser.id,
        },
      },
    };

    await this.ProjectModel.updateMany(query, { $set: { 'users.$': updatedUser } })
    return updatedUser;
  }

  async list(page, perPage, sortKey, trend, searchKey='') {
    const query = { $or: [
      { username: { $regex: searchKey, $options: 'i' } },
      //  {role: { "$regex": searchKey, "$options": "i" }},
      { created_at: { $regex: searchKey, $options: 'i' } },
      { updated_at: { $regex: searchKey, $options: 'i' } }],
    }
    let filter = {}
    if (sortKey == 'username') filter = { username: trend }
    else if (sortKey == 'role') filter = { role: trend }
    else if (sortKey == 'creared_at') filter = { created_at: trend }
    else filter = { updated_at: trend }
    const size = await this.UserModel.count(query)
    const users = await this.UserModel.find(query).sort(filter).skip(page * perPage - perPage).limit(perPage)
    return { size, users: users.map(this.userMapper.toEntity) }
  }

  async getAll(){
    const size = await this.UserModel.count({})
    const users = await this.UserModel.find()
    return { size, users: users.map(this.userMapper.toEntity) }
  }

 
}
module.exports = UserGateway;
