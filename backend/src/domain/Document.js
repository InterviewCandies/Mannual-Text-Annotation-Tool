
class Document {
    constructor(id,project_id,content,status,history,labels,user,admin,created_at,updated_at){
        this.id= id;
        this.project_id = project_id
        this.content=content;
        this.status = status
        this.history = history
        this.labels = labels
        this.user = user
        this.admin = admin
        this.created_at=created_at;
        this.updated_at=updated_at;
    }
}

module.exports= Document;