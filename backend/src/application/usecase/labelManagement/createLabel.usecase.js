const LabelGateway = require('../../../infra/gateway/label.gateway')

class CreateLabel{
    constructor(){
        this.labelGateway = new LabelGateway();
    }
    async execute(data){
        const result =await this.labelGateway.createLabel(data);
        return result;
    }
}

module.exports = CreateLabel;