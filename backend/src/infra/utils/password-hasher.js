const bcrypt = require('bcryptjs');

module.exports = class PasswordHasher {
  constructor() {
    this.hash = this.hash.bind(this)
    this.isMatched = this.isMatched.bind(this)
  }

  async hash(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash
  }

  async isMatched(a, b) {
    const result = await bcrypt.compare(a, b);
    return result
  }
}
