
class ImportData{
    constructor({datasetGateway}){
        this.datasetGateway = datasetGateway;
    }
    async execute(data){
        const result =await this.datasetGateway.importData(data);
        return result;
    }
}

module.exports = ImportData;