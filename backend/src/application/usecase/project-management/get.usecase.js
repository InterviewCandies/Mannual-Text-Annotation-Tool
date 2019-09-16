
class GetProjectUseCase {
  constructor({ projectGateway }) {
    this.projectGateway = projectGateway
  }

  async execute(id) {
    const project = await this.projectGateway.findById(id)
    return project;
  }
}

module.exports = GetProjectUseCase
