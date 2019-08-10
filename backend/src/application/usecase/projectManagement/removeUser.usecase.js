class RemoveUser {
     constructor({projectGateway}){
        this.projectGateway= projectGateway
     }
     async execute(data){
        const result= this.projectGateway.removeUser(data);
        return result;
     }
}

module.exports = RemoveUser