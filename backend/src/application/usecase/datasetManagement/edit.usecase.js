
class EditDocument{
    constructor({datasetGateway}){
        this.datasetGateway = datasetGateway;
    }
    async execute(data){
        const result =await this.datasetGateway.edit(data);
        return result;
    }
}

module.exports = EditDocument;