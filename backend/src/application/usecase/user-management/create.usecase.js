const User = require('../../../domain/user')

class CreateUserUseCase {
  constructor({ userGateway }) {
    this.userGateway = userGateway
  }

  async execute(username, password, role) {
    // check
    const check = await this.userGateway.findByUsername(username)
    if (check) return false
    const entity = new User(null, username, password, role)
    const user = await this.userGateway.create(entity);
    return user
  }
}

module.exports = CreateUserUseCase;
