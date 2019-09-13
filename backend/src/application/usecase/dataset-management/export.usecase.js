class ExportDataUseCase {
  constructor({ datasetGateway }) {
    this.datasetGateway = datasetGateway;
  }

  async execute(project_id) {
    const documents = await this.datasetGateway.exportData(project_id)
    return documents;
  }
}

module.exports = ExportDataUseCase;
