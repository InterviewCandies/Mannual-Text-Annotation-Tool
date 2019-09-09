class SearchDocumentUseCase {
    constructor({datasetGateway}){
       this.datasetGateway= datasetGateway
    }
    async execute(project_id,page,perPage,searchKey){
       //Check id,page,perPage,searchKey
       const documents= await this.datasetGateway.search(project_id,page,perPage,searchKey);
       return documents;
    }
}

module.exports = SearchDocumentUseCase