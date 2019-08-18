class DeleteLabel {
    constructor({labelGateway}){
        this.labelGateway = labelGateway
    }
    async execute(data){
        const result = await this.labelGateway.delete(data);
        return result;
    }
}

module.exports = DeleteLabel;