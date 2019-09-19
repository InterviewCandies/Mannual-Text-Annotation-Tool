const exportData = require('../../application/usecase/dataset-management/export.usecase')

class DatasetController {
  constructor({ importDataset, listDocument, editDocument, deleteDocument, getDocument,
    verifyDocument, searchDocument, annotateDocument, exportDataset }) {
    this.importDataset = importDataset
    this.listDocument = listDocument
    this.editDocument = editDocument
    this.getDocument = getDocument
    this.deleteDocument = deleteDocument
    this.verifyDocument = verifyDocument
    this.searchDocument = searchDocument
    this.annotateDocument = annotateDocument
    this.exportDataset = exportDataset
    this.importData = this.importData.bind(this)
    this.exportData = this.exportData.bind(this)
    this.list = this.list.bind(this)
    this.edit = this.edit.bind(this)
    this.get = this.get.bind(this)
    this.delete = this.delete.bind(this)
    this.verify = this.verify.bind(this)
    this.search = this.search.bind(this)
    this.annotate = this.annotate.bind(this)
  }


  // eslint-disable-next-line consistent-return
  async importData(req, res) {
    const project_id = req.params.id
    const { file } = req
    if (req.fileValidationError) {
      return res.status(400).json({ message: req.fileValidationError })
    }
    const filename = file.originalname
    const fileType = filename.split('.').pop()
    const result = await this.importDataset.execute(project_id, file, fileType);
    try {
      if ( result != 0 && !result) throw Error('Failed to import file.Check out your file')
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async exportData(req, res) {
    const project_id = req.params.id
    const result = await this.exportDataset.execute(project_id);
    try {
      res.status(200).json(result);
      console.log(result.length)

    } catch (error) {
      res.status(400).send(error);
    }
  }


  async get(req, res) {
    const project_id = req.params.id
    const result = await this.getDocument.execute(project_id);
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async list(req, res) {
    const project_id = req.params.id
    const { page, perPage, sortKey, trend } = req.body
    const result = await this.listDocument.execute(project_id, page, perPage, sortKey, trend)
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }


  async edit(req, res) {
    const { id } = req.params
    const { content } = req.body
    const result = await this.editDocument.execute(id, content)
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async delete(req, res) {
    const { id } = req.params
    const result = await this.deleteDocument.execute(id)
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async search(req, res) {
    const project_id = req.params.id;
    const { page, perPage, searchKey } = req.body
    const result = await this.searchDocument.execute(project_id, page, perPage, searchKey)
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async verify(req, res) {
    const { id } = req.params
    const { status } = req.body
    const result = await this.verifyDocument.execute(id, status)
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async annotate(req, res) {
    const { id } = req.params
    const { labels, user_id } = req.body
    const result = await this.annotateDocument.execute(id, labels, user_id)
    try {
      if (!result) throw new Error('Your annotation will not be saved because document has been labeled before')
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = DatasetController
