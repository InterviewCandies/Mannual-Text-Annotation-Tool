
class Label {
    constructor(id,content,color,shortcut,created_at,updated_at){
        this.id= id;
        this.content=content;
        this.color=color;
        this.shortcut = shortcut;
        this.created_at=created_at;
        this.updated_at=updated_at;
    }
}

module.exports= Label;