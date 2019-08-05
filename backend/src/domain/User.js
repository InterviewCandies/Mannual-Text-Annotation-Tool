// User definition includes username and password
// User can be regular user or admin

class User {
    constructor(id,username,password,role,created_at,updated_at){  
        this.user ={
            id : id,
            username : username,
            password : password,
            role : role,
            created_at : created_at,
            updated_at : updated_at
        }
    }
    getObj(){
        return this.user;
    }
}

module.exports = User; 