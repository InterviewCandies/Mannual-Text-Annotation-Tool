const Label = require('../../domain/label')

class LabelController {
  constructor({ createLabel, deleteLabel, editLabel, listLabel }) {
    this.createLabel = createLabel
    this.editLabel = editLabel
    this.deleteLabel = deleteLabel
    this.listLabel = listLabel

    this.create = this.create.bind(this)
    this.edit = this.edit.bind(this)
    this.delete = this.delete.bind(this)
    this.list = this.list.bind(this)
  }

  async create(req, res) {
    const { project_id, content, shortcut, backgroundColor, textColor } = req.body
    const label = new Label(null, project_id, content, shortcut, backgroundColor, textColor)
    const result = await this.createLabel.execute(label);
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async delete(req, res) {
    const { id } = req.params
    const result = await this.deleteLabel.execute(id);
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async edit(req, res) {
    const { id } = req.params
    const { project_id, content, shortcut, backgroundColor, textColor } = req.body
    const label = new Label(id, project_id, content, shortcut, backgroundColor, textColor)
    const result = await this.editLabel.execute(id, label);
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async list(req, res) {
    const project_id = req.params.id
    const result = await this.listLabel.execute(project_id);
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = LabelController;
