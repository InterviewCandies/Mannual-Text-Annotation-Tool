const fs = require('fs')
const util = require('util')

class ImportDataUseCase {
  constructor({ datasetGateway, fileHandler }) {
    this.datasetGateway = datasetGateway;
    this.fileHandler = fileHandler
  }

  async execute(project_id, file, fileType) {
    const readFile = util.promisify(fs.readFile)
    let dataset = await readFile(file.path, 'utf8')
    dataset = this.fileHandler.extract(dataset, fileType)
    // eslint-disable-next-line no-return-await
    if (dataset) dataset.map(async (document) => await this.datasetGateway.importData(project_id, document))
    return dataset
  }
}

module.exports = ImportDataUseCase;
