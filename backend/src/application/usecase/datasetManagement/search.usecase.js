class SearchDocument {
    constructor({datasetGateway}){
       this.datasetGateway= datasetGateway
    }
    async execute(data){
       const result= this.datasetGateway.search(data);
       return result;
    }
}

module.exports = SearchDocument