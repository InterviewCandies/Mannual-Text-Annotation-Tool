
class EditDocumentUseCase {
  constructor({ datasetGateway }) {
    this.datasetGateway = datasetGateway;
  }

  async execute(id, content) {
    // Find entity by id
    // eslint-disable-next-line prefer-const
    let document = await this.datasetGateway.findById(id)
    // Edit the content of document
    document.content = content
    // Save changes
    const updatedDoc = await this.datasetGateway.edit(document);
    // Return updated entity
    return updatedDoc;
  }
}

module.exports = EditDocumentUseCase;
