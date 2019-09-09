
class DeleteDocumentUseCase{
    constructor({datasetGateway}){
        this.datasetGateway = datasetGateway;
    }
    async execute(id){
        const document = await this.datasetGateway.findById(id)
        //Check entity

        //Delete entity
        const result =await this.datasetGateway.delete(document);
        return result;
    }
}

module.exports = DeleteDocumentUseCase;