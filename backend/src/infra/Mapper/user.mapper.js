const User = require('../../domain/User')

module.exports = class UserMapper {
  constructor({ passwordHasher }) {
    this.passwordHasher = passwordHasher
  }


  toEntity(data) {
    const { _id, username, password, role, created_at, updated_at } = data
    return new User(_id, username, password, role, created_at, updated_at)
  }


  async toDatabase(entity) {
    const { username, role } = entity;
    let { password } = entity
    password = await this.passwordHasher.hash(password);
    return {
      username,
      password,
      role,
      updated_at: new Date().toLocaleString(),
    }
  }


  async isMatched(password, data) {
    const result = await this.passwordHasher.isMatched(password, data.password)
    return result;
  }
}
