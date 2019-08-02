const LabelGateway= require('../../../infra/gateway/label.gateway');

class EditLabel{
    constructor(){
          this.labelGateway = new LabelGateway(); 
    }
    async execute(data){
         const result = this.labelGateway.editLabel(data);  
         return result;
    }
} 
module.exports =EditLabel;