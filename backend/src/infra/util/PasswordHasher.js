const bcrypt = require('bcryptjs');

module.exports ={
        hash(password){
           
            let salt = bcrypt.genSaltSync(10);
            return  bcrypt.hashSync(password, salt);
            
        },
        isMatched(a,b){
            return bcrypt.compareSync(a,b);
        } 
}