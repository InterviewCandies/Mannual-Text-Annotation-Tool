class RemoveUserUseCase {
  constructor({ projectGateway, userGateway }) {
    this.projectGateway = projectGateway
    this.userGateway = userGateway
  }

  async execute(id, user_id) {
    const user = await this.userGateway.findById(user_id)
    const project = await this.projectGateway.findById(id)
    let index = -1
    for (let i = 0; i < project.users.length; i += 1) {
      if (project.users[i].username == user.username) {
        index = i;
        break;
      }
    }
    if (index != -1) project.users.splice(index, 1)
    const updatedProject = await this.projectGateway.update(project);
    return updatedProject;
  }
}

module.exports = RemoveUserUseCase
