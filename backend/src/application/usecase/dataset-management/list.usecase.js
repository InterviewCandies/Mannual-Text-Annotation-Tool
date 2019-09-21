
class ListDocumentUseCase {
  constructor({ datasetGateway }) {
    this.datasetGateway = datasetGateway;
  }


  async execute(project_id, page, perPage, sortKey, trend,searchKey) {
    // Check project_id, page, perpage
    if (page <= 0) return Error('No page exists')
    // Get list of document
    const documents = await this.datasetGateway.list(project_id, page, perPage, sortKey, trend,searchKey);
    // Return list of document
    return documents;
  }
}

module.exports = ListDocumentUseCase;
