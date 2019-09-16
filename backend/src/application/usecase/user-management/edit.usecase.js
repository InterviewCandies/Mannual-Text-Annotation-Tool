class EditUserUseCase {
  constructor({ userGateway }) {
    this.userGateway = userGateway;
  }

  async execute(id, username, password, role) {
    // Check params
    // eslint-disable-next-line prefer-const
    let user = await this.userGateway.findById(id)
    // Change
    const userGetByName = await this.userGateway.findByUsername(username)
    if (userGetByName && userGetByName.id != id) return { message: 'Username is existed' }
    user.username = username
    user.password = password
    user.role = role
    const updatedUser = await this.userGateway.edit(user);
    return updatedUser;
  }
}

module.exports = EditUserUseCase;
