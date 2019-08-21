
class ListDocument{
    constructor({datasetGateway}){
        this.datasetGateway = datasetGateway;
    }
    async execute(data){
        const result =await this.datasetGateway.list(data);
        return result;
    }
}

module.exports = ListDocument;