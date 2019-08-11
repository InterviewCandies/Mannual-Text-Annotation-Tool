
class GetProjectByUser {
    constructor({projectGateway}){
        this.projectGateway =projectGateway
    }
    async execute(data){
        const result = this.projectGateway.getProjectByUser(data);
        return result;
    }

}
module.exports = GetProjectByUser