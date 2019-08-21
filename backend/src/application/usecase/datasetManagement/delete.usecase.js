
class DeleteDocument{
    constructor({datasetGateway}){
        this.datasetGateway = datasetGateway;
    }
    async execute(data){
        const result =await this.datasetGateway.delete(data);
        return result;
    }
}

module.exports = DeleteDocument;