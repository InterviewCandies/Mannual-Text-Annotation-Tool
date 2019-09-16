class SearchProjectUseCase {
  constructor({ projectGateway }) {
    this.projectGateway = projectGateway
  }

  async execute(page, perPage, searchKey) {
    // check params
    const projects = await this.projectGateway.search(page, perPage, searchKey);
    return projects;
  }
}

module.exports = SearchProjectUseCase
