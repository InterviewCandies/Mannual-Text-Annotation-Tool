class SearchProject {
    constructor({projectGateway}){
       this.projectGateway= projectGateway
    }
    async execute(data){
       const result= this.projectGateway.search(data);
       return result;
    }
}

module.exports = SearchProject