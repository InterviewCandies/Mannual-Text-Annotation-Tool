
class Label {
    constructor(id,project_id,content,shortcut,backgroundColor,textColor,created_at,updated_at){
        this.id= id;
        this.project_id = project_id
        this.content=content;
        this.backgroundColor=backgroundColor;
        this.textColor=textColor;
        this.shortcut = shortcut;
        this.created_at=created_at;
        this.updated_at=updated_at;
    }
}

module.exports= Label;