const User = require('../../domain/User')
module.exports=class UserMapper{
        constructor({passwordHasher}){
            this.passwordHasher = passwordHasher
        }
        toEntity(data){
            const {_id,username,password,role,created_at,updated_at} = data;
            return new User(_id,username,password,role,created_at,updated_at); 
        }
        async toDatabase(data){
            let {username,password,role} = data;
            password =await this.passwordHasher.hash(password);
            return {
                    username:username,
                    password: password,
                    role : role,
                    updated_at : Date.now()     
            }
        }
        async isMatched(password,data){
             return await this.passwordHasher.isMatched(password,data.password);      
        }
       
}