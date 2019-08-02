const LabelGateway =require('../../../infra/gateway/label.gateway');
class DeleteLabel {
    constructor(){
        this.labelGateway = new LabelGateway();
    }
    async execute(data){
        const result = await this.labelGateway.deleteLabel(data);
        return result;
    }
}

module.exports = DeleteLabel;