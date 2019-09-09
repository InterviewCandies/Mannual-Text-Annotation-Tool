class SearchUserUseCase {
    constructor({userGateway}){
       this.userGateway= userGateway
    }
    async execute(page,perPage,searchKey){
       //check params
       const users= this.userGateway.search(page,perPage,searchKey);
       return users;
    }
}

module.exports = SearchUserUseCase