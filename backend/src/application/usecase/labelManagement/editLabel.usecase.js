
class EditLabel{
    constructor({labelGateway}){
          this.labelGateway = labelGateway
    }
    async execute(data){
         const result = this.labelGateway.edit(data);  
         return result;
    }
} 
module.exports =EditLabel;