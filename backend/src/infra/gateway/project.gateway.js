const searchQuery = (searchKey='') => ({ $or: [
  { project_name: { $regex: searchKey, $options: 'i' } },
  { project_description: { $regex: searchKey, $options: 'i' } },
  { created_at: { $regex: searchKey, $options: 'i' } },
  { updated_at: { $regex: searchKey, $options: 'i' } }],
})

const sortQuery = (sortKey, trend) => {
  let filter = {}
  if (sortKey == 'project_name') filter = { project_name: trend }
  else if (sortKey == 'project_description') filter = { project_description: trend }
  else if (sortKey == 'creared_at') filter = { created_at: trend }
  else filter = { updated_at: trend }
  return filter
}


class ProjectGateway {
  constructor({ ProjectModel,DocumentModel, projectMapper }) {
    this.ProjectModel = ProjectModel
    this.DocumentModel = DocumentModel
    this.projectMapper = projectMapper
  }

  async findById(id) {
    const project = await this.ProjectModel.findOne({ _id: id })
    return this.projectMapper.toEntity(project)
  }

  async create(entity) {
    const dbItem = this.projectMapper.toDatabase(entity)
    const project = await this.ProjectModel.insertMany(dbItem);
    return project.map(this.projectMapper.toEntity);
  }

  async update(entity) {
    const dbItem = this.projectMapper.toDatabase(entity)
    await this.ProjectModel.updateOne({ _id: entity.id }, dbItem);
    const updatedResult = await this.findById(entity.id)
    return updatedResult
  }

  async delete(id) {
    const result = await this.ProjectModel.deleteOne({ _id: id });
    let ans={}
    if(result.deletedCount)  await this.DocumentModel.deleteMany({project_id:id})
    // eslint-disable-next-line eqeqeq
    return result.deletedCount == 1
  }


  async list(page, perPage, sortKey, trend,searchKey) {
    const query = searchQuery(searchKey)
    const size = await this.ProjectModel.count(query)
    const projects = await this.ProjectModel.find(query)
      .sort(sortQuery(sortKey, trend))
      .skip((perPage * page) - perPage)
      .limit(perPage)
    return { size, projects: projects.map(this.projectMapper.toEntity) };
  }


  async search(page, perPage, searchKey) {
    const projects = await this.ProjectModel.find(searchQuery(searchKey))
      .skip((perPage * page) - perPage)
      .limit(perPage)
    const size = projects.length
    return { size,
      projects: projects.map(this.projectMapper.toEntity),
    };
  }



  async userProjectList(username, page, perPage, sortKey, trend,searchKey) {
    const query = {
      $and: [
        {
          'users.username': username,
        },
        searchQuery(searchKey),
      ],
    }
    const size = await this.ProjectModel.count(query)
    const projects = await this.ProjectModel.find(query)
      .sort(sortQuery(sortKey, trend))
      .skip((perPage * page) - perPage)
      .limit(perPage)
    return {
      size,
      projects: projects.map(this.projectMapper.toEntity),
    }
  }
}

module.exports = ProjectGateway;
