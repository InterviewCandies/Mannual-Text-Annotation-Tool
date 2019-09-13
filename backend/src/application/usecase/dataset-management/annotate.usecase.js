
class Annotate{
    constructor({datasetGateway,userGateway}){
        this.datasetGateway = datasetGateway;
        this.userGateway = userGateway
    }
    async execute(id,labels,user_id){
        //Check labels
        
        //Find entity by id
        let  document = await this.datasetGateway.findById(id)
        let  user = await this.userGateway.findById(user_id)
        const {role} = user
        //Check if it true
        if(document.labels.length && !role) return false
         
         //Change labels of entity 
         document.labels = labels
         document.user = user.id
         
        //Update entity
        const updatedDoc =await this.datasetGateway.annotate(document);

        //Return updated entity
        return updatedDoc;
    }
}

module.exports = Annotate;