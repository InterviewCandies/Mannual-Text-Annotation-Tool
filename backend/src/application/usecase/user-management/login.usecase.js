class Login {
  constructor({ userGateway }) {
    this.userGateway = userGateway;
  }

  async execute(username, password) {
    const user = await this.userGateway.login(username, password);
    return user
  }
}

module.exports = Login;
