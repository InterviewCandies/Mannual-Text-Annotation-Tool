
class StatisticsUseCase {
    constructor({projectGateway,datasetGateway,labelGateway}){
        this.projectGateway = projectGateway
        this.datasetGateway = datasetGateway
        this.labelGateway = labelGateway
    }

    countByLabel(labels,dataset=[]){
        let a=[]
        for(let i=0;i<labels.length;i++) a[ labels[i].content ]=0

        for(let i =0;i<dataset.length;i++)
            dataset[i].labels.map(label=> a[label.content]+=1)
        let b=[]

        for(let i=0;i<labels.length;i++) b.push(a[ labels[i].content])
        
        return b
     }

    countByUser(users,dataset=[],mistakes=0){
        let a=[]
        for(let i=0;i<users.length;i++) a[ users[i].id]=0

        for(let i =0;i<dataset.length;i++)
        if(dataset[i].status == mistakes) a[ dataset[i].user]+=1
        let b=[]

        for(let i=0;i<users.length;i++) b.push(a[ users[i].id])
        
        return b
    }

    async execute(project_id){
        const project = await this.projectGateway.findById(project_id)
        const users = project.users
        const labels = await this.labelGateway.list(project_id)
        const result = await this.datasetGateway.getAll(project_id)
        const datasetSize = result.size 
        const labeledDocs = result.labeled
        const dataset = result.dataset
        const labelsCount = this.countByLabel(labels,dataset)
        const rightLabels = this.countByUser(users,dataset)
        const wrongLabels = this.countByUser(users,dataset,true)
        return {
             project,
             datasetSize,
             labeledDocs,
             users,
             labels,
             labelsCount,
             rightLabels,
             wrongLabels
        }  
    }
}

module.exports = StatisticsUseCase