
class EditLabelUseCase{
    constructor({labelGateway}){
          this.labelGateway = labelGateway
    }
    async execute(id,label){
         const updatedLabels = await this.labelGateway.edit(id,label);  
         return updatedLabels;
    }
} 
module.exports =EditLabelUseCase;