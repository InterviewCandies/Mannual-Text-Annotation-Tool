class ListProjectUseCase {
      constructor({projectGateway}){
              this.projectGateway = projectGateway;
      }
      async execute(page,perPage,sortKey,trend){
          //Check params
          const projects = await this.projectGateway.list(page,perPage,sortKey,trend);
          return projects;
      }
}

module.exports = ListProjectUseCase;