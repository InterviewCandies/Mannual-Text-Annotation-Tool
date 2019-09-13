const Project = require('../../domain/Project')

module.exports = class ProjectMapper {
  toEntity(data) {
    const { _id, project_name, project_description, users, created_at, updated_at } = data;
    return new Project(_id, project_name, project_description, users, created_at, updated_at);
  }

  toDatabase(entity) {
    const { project_name, project_description, users } = entity;
    return {
      project_name,
      users,
      project_description,
      updated_at: new Date().toLocaleString(),
    }
  }
}
