const UserGateway = require('../../../infra/gateway/user.gateway')
class Login{
    constructor(){
          this.userGateway = new UserGateway();
    }
    async execute(userData){

        // Step 1: Use gateway to check if user is in the database
        const result= await this.userGateway.findByUsername(userData); 
        //Step 2: check the return data  
      
        // if user is in the database then return result
            if(result) return result;

        // if not return error message
            return Error('User does not exist');
                
      
    }
}

module.exports = Login;