
class getUserUseCase {
  constructor({ userGateway }) {
    this.userGateway = userGateway
  }

  async execute(username) {
    const user = await this.userGateway.findByUsername(username)
    return user
  }
}

module.exports = getUserUseCase
