
class CreateLabelUseCase {
  constructor({ labelGateway }) {
    this.labelGateway = labelGateway;
  }

  async execute(label) {
    // Validate entity
    const result = await this.labelGateway.create(label);
    return result;
  }
}

module.exports = CreateLabelUseCase;
