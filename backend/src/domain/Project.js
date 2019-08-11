
class Project {
    constructor(id,name,description,created_at,updated_at){
        this.id = id;
        this.project_name =name;
        this.project_description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
} 

module.exports = Project;