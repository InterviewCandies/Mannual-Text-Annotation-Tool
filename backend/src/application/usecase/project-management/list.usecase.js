class ListProjectUseCase {
  constructor({ projectGateway }) {
    this.projectGateway = projectGateway;
  }

  async execute(page, perPage, sortKey, trend,searchKey) {
    // Check params
    const projects = await this.projectGateway.list(page, perPage, sortKey, trend,searchKey);
    return projects;
  }
}

module.exports = ListProjectUseCase;
