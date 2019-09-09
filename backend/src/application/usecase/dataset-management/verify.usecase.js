
class VerifyDocumentUseCase{
    constructor({datasetGateway}){
        this.datasetGateway = datasetGateway;
    }
    async execute(id,status){
        //Check Status 
        let document = await this.datasetGateway.findById(id);
        //Change status
        document.status = status
        //Save changes
        const updatedDocs =await this.datasetGateway.verify(document);
        //Return Updated entity
        return updatedDocs;
    }
}

module.exports = VerifyDocumentUseCase;