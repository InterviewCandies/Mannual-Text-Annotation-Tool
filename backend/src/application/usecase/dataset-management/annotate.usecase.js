class Annotate {
  constructor({ datasetGateway, userGateway }) {
    this.datasetGateway = datasetGateway;
    this.userGateway = userGateway
  }

  async execute(id, labels, user_id, status) {
    // Check labels
    // Find entity by id
    // eslint-disable-next-line prefer-const
    let document = await this.datasetGateway.findById(id)
    if(user_id) {    
      document.user = user_id
    }
    // Check if it true
    // Change labels of entity
    document.labels = labels
    document.status = status

    // Update entity
    const updatedDoc = await this.datasetGateway.annotate(document);

    // Return updated entity
    return updatedDoc;
  }
}

module.exports = Annotate;
