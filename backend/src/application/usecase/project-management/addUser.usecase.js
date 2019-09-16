class AddUserUseCase {
  constructor({ projectGateway, userGateway }) {
    this.projectGateway = projectGateway;
    this.userGateway = userGateway
  }

  async execute(id, user_id) {
    // Check id, user_id
    const user = await this.userGateway.findById(user_id)
    const project = await this.projectGateway.findById(id)

    // Check if user is in project
    const inx = project.users.map((i) => i.username).indexOf(user.username)

    if (inx != -1) return false

    project.users.push(user)

    const updatedProject = await this.projectGateway.update(project);
    return updatedProject;
  }
}

module.exports = AddUserUseCase;
