
class Document {
    constructor(id,project_id,content,status,created_at,updated_at){
        this.id= id;
        this.project_id = project_id
        this.content=content;
        this.status = status
        this.created_at=created_at;
        this.updated_at=updated_at;
    }
}

module.exports= Document;