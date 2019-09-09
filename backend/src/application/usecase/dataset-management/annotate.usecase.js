
class Annotate{
    constructor({datasetGateway}){
        this.datasetGateway = datasetGateway;
    }
    async execute(id,labels,role){
        //Check labels
        
        //Find entity by id
        let  document = await this.datasetGateway.findById(id)
        
        //Check if it true
        if(document.labels.length && !role) return false
         
         //Change labels of entity 
         document.labels = labels
        //Update entity
        const updatedDoc =await this.datasetGateway.annotate(document);

        //Return updated entity
        return updatedDoc;
    }
}

module.exports = Annotate;