const fs = require('fs')
const fileHandler = require('../util/fileHandler')
class DatasetGateway {
    constructor({ DocumentModel, documentMapper }){
           this.DocumentModel  =  DocumentModel;
           this.documentMapper = documentMapper
         
    }

    async importData(req){
        const id = req.params.id;
        let file = req.file
        let that =this
        fs.readFile(file.path,'utf8',function(err,res){
            let dataset=[]
            if(!err) dataset= fileHandler.extract(res)
            dataset.map( async document=> await that.DocumentModel.insertMany({project_id:id,content:document}))
            return dataset
        }) 
    }
    async list(req){
        const id = req.params.id;
        let {page,perPage} = req.body 
        perPage = Number(perPage)
        const size = await this.DocumentModel.count({project_id:id})
        const result = await this.DocumentModel.find({project_id:id})
                                              .skip((perPage * page) - perPage)
                                              .limit(perPage)
        return {size: size,dataset: result.map(this.documentMapper.toEntity)} ; 
    }
    async search(req){
        const id = req.params.id;
        let {page,perPage,value} = req.body 
        perPage = Number(perPage)
        const query=
        {'$and':
           [ 
             {
                '$or' : [  
                    {content: { "$regex":  value , "$options": "i" }},
                    {status: { "$regex": value, "$options": "i" }},
                    {created_at: { "$regex": value , "$options": "i" }},
                    {updated_at: { "$regex": value , "$options": "i" }}    
                ]
            },
            {
                project_id : id
            }
           ]
        } 
        const size = await this.DocumentModel.count(query)
        const result = await this.DocumentModel.find(query)
                                              .skip((perPage * page) - perPage)
                                              .limit(perPage)
        return {size: size,dataset: result.map(this.documentMapper.toEntity)} ; 
    }
    async edit(req){
        const id = req.params.id
        const document = this.documentMapper.toDatabase(req.body)
        const result = await this.DocumentModel.updateOne({_id:id},document);
        return result.nModified==1;
    }
    async delete(req){
        const id = req.params.id
        const result = await this.DocumentModel.deleteOne({_id:id});
        return  result.deletedCount==1;
    }
    
    async verify(req){
        const id = req.params.id
        const {status}=req.body
        const result = await this.DocumentModel.updateOne({_id:id},{status:status})
        return result.nModified==1;
    }
    
}

module.exports =DatasetGateway;