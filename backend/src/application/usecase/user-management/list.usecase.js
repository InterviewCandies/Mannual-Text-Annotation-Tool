
class ListUserUseCase {
  constructor({ userGateway }) {
    this.userGateway = userGateway
  }

  async execute(page, perPage, sortKey, trend) {
    // Check params
    const users = await this.userGateway.list(page, perPage, sortKey, trend);
    return users;
  }
}

module.exports = ListUserUseCase
