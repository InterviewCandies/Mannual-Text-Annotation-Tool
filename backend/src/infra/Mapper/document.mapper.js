const Document = require('../../domain/Document')

module.exports =class DocumentMapper {
    
    toEntity(data) {
        let {_id,project_id,content,status,labels,created_at,updated_at} = data
        labels = labels || [] 
        return new Document(_id,project_id,content,status,labels,created_at,updated_at);
    }
    toDatabase(entity){
        const {content,labels,status} =entity
        const document = {
            content : content,
            labels  : labels,
            status  : status,
            updated_at : new Date().toLocaleString()
        }
        return document
    }
    
}