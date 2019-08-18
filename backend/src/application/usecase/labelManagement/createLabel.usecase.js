
class CreateLabel{
    constructor({labelGateway}){
        this.labelGateway = labelGateway;
    }
    async execute(data){
        const result =await this.labelGateway.create(data);
        return result;
    }
}

module.exports = CreateLabel;