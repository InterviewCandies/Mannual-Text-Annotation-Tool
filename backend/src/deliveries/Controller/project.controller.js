module.exports = class ProjectController {
  constructor({ listProject, createProject, deleteProject, editProject, getProject,
    _addUser, _removeUser, _userProjectList, }) {
    this.listProject = listProject
    this.createProject = createProject
    this.deleteProject = deleteProject
    this.editProject = editProject
    this.getProject = getProject
    // eslint-disable-next-line no-underscore-dangle
    this._addUser = _addUser
    // eslint-disable-next-line no-underscore-dangle
    this._removeUser = _removeUser
    // eslint-disable-next-line no-underscore-dangle
    this._userProjectList = _userProjectList
  

    this.list = this.list.bind(this)
    this.create = this.create.bind(this)
    this.delete = this.delete.bind(this)
    this.get = this.get.bind(this)
    this.update = this.update.bind(this)
    this.addUser = this.addUser.bind(this)
    this.removeUser = this.removeUser.bind(this)
    this.userProjectList = this.userProjectList.bind(this)
  }

  async list(req, res) {
    const page = req.params.id
    const { perPage, sortKey, trend, searchKey } = req.body
    const result = await this.listProject.execute(page, perPage, sortKey, trend,searchKey);
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async create(req, res) {
    const { project_name, project_description } = req.body;
    const result = await this.createProject.execute(project_name, project_description);
    try {
      res.status(200).json(result);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async get(req, res) {
    const { id } = req.params
    const result = await this.getProject.execute(id)
    try {
      res.status(200).json(result);
    } catch (e) {
      res.status(400).send(e);
    }
  }


  async update(req, res) {
    const { id } = req.params
    const { project_name, project_description } = req.body
    const result = await this.editProject.execute(id, project_name, project_description);
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  }


  async delete(req, res) {
    const { id } = req.params
    const result = await this.deleteProject.execute(id);
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  }


  async addUser(req, res) {
    const { id } = req.params
    const { user_id } = req.body
    // eslint-disable-next-line no-underscore-dangle
    const result = await this._addUser.execute(id, user_id);
    try {
      if (!result) throw new Error('User has been added to this project before')
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async removeUser(req, res) {
    const { id } = req.params
    // eslint-disable-next-line camelcase
    const { user_id } = req.body
    // eslint-disable-next-line no-underscore-dangle
    const result = await this._removeUser.execute(id, user_id);
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async userProjectList(req, res) {
    const user_id = req.params.id
    const { page, perPage, sortKey, trend, searchKey } = req.body
    // eslint-disable-next-line no-underscore-dangle
    const result = await this._userProjectList.execute(user_id, page, perPage, sortKey, trend,searchKey);
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  }

}
