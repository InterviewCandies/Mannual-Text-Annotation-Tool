const Document = require('../../domain/Document')

module.exports =class DocumentMapper {
    constructor(){

    }
    toEntity(data) {
        const {_id,project_id,content,status,created_at,updated_at} = data
        return new Document(_id,project_id,content,status,created_at,updated_at);
    }
    toDatabase(data){
        const {content} = data
        const document = {
            content : content,
            updated_at : Date()
        }
        return document
    }
    
}