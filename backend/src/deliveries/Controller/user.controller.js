
class UserController {
  constructor({ _login, createUser, deleteUser, editUser, getUser, listUser}) {
    // eslint-disable-next-line no-underscore-dangle
    this._login = _login
    this.createUser = createUser
    this.deleteUser = deleteUser
    this.editUser = editUser
    this.getUser = getUser
    this.listUser = listUser

    this.login = this.login.bind(this)
    this.get = this.get.bind(this)
    this.list = this.list.bind(this)
    this.delete = this.delete.bind(this)
    this.create = this.create.bind(this)
    this.edit = this.edit.bind(this)
  }

  async get(req, res) {
    const { username } = req.body
    const result = await this.getUser.execute(username);
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }


  async list(req, res) {
    const page = req.params.id
    const { perPage, sortKey, trend, searchKey } = req.body
    const result = await this.listUser.execute(page, perPage, sortKey, trend, searchKey)
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  
  async login(req, res) {
    const { username, password } = req.body
    // eslint-disable-next-line no-underscore-dangle
    const result = await this._login.execute(username, password);
    try {
      if (!result) throw new Error('Cant find this user')
      res.header('auth-token', result).send(result);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async create(req, res) {
    const { username, password, role } = req.body
    const result = await this.createUser.execute(username, password, role);
    try {
      if (!result) throw new Error('Username has been taken.Please try a different username')
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params
    const result = await this.deleteUser.execute(id);
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }


  async edit(req, res) {
    const { id } = req.params
    const { username, password, role } = req.body
    const result = await this.editUser.execute(id, username, password, role);
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = UserController;
