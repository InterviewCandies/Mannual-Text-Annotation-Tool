class DeleteLabelUseCase {
  constructor({ labelGateway }) {
    this.labelGateway = labelGateway
  }

  async execute(id) {
    // Find ts entity
    const label = await this.labelGateway.findById(id)
    // Remove this label
    const result = await this.labelGateway.delete(label);
    return result;
  }
}

module.exports = DeleteLabelUseCase;
