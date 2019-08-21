
class VerifyDocument{
    constructor({datasetGateway}){
        this.datasetGateway = datasetGateway;
    }
    async execute(data){
        const result =await this.datasetGateway.verify(data);
        return result;
    }
}

module.exports = VerifyDocument;