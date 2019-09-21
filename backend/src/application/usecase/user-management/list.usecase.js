
class ListUserUseCase {
  constructor({ userGateway }) {
    this.userGateway = userGateway
  }

  async execute(page, perPage, sortKey, trend, searchKey) {
    // Check params
    const users = await this.userGateway.list(page, perPage, sortKey, trend, searchKey);
    return users;
  }
}

module.exports = ListUserUseCase
