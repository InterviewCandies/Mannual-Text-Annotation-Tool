
class GetAllDocumentUseCase {
    constructor({ datasetGateway }) {
      this.datasetGateway = datasetGateway;
    }
  
  
    async execute(project_id) {
     
      const documents = await this.datasetGateway.getAll(project_id);
      // Return list of document
      return documents;
    }
  }
  
  module.exports = GetAllDocumentUseCase;
  