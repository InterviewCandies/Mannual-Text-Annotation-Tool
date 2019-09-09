
class GetDocumentUseCase{
    constructor({datasetGateway}){
        this.datasetGateway =datasetGateway
    }   
    async execute(project_id){
        const document = await this.datasetGateway.getRandomRecord(project_id)
        return document; 
    }
}

module.exports = GetDocumentUseCase