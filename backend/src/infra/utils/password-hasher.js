const bcrypt = require('bcryptjs');

module.exports = class PasswordHasher{
        constructor(){
            this.hash = this.hash.bind(this)
            this.isMatched = this.isMatched.bind(this)
        }
        async hash(password){
           
            let salt =await  bcrypt.genSalt(10);
            return await bcrypt.hash(password, salt);
            
        }
        async isMatched(a,b){
            return await bcrypt.compare(a,b);
        } 
}