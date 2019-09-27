
class GetDocsByUserIdUseCase {
    constructor({ datasetGateway,userGateway }) {
      this.datasetGateway = datasetGateway
      this.userGateway = userGateway
    }
  
    async execute(project_id,userId,maxDocs=100) {
      const user =await this.userGateway.findById(userId)
      const document = await this.datasetGateway.getDocsByUserId(project_id,user.id,maxDocs)
      return document
    }
  }
  
  module.exports = GetDocsByUserIdUseCase
  