// User definition includes username and password
// User can be regular user or admin

class User {
    constructor(id,username,password,role,created_at,updated_at){
        this.id = id;
        this.username=username;
        this.password=password;
        this.role=role;
        this.created_at=created_at;
        this.updated_at=updated_at; 
    }
}

module.exports = User; 