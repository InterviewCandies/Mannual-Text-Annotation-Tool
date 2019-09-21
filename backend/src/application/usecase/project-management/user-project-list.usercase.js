
class UserProjectList {
  constructor({ projectGateway, userGateway }) {
    this.projectGateway = projectGateway
    this.userGateway = userGateway
  }

  async execute(user_id, page, perPage, sortKey, trend,searchKey) {
    const user = await this.userGateway.findById(user_id)
    const projects = await this.projectGateway.userProjectList(user.username, page, perPage, sortKey, trend,searchKey);
    return projects;
  }
}
module.exports = UserProjectList
