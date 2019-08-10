class Login{
    constructor({userGateway}){
          this.userGateway = userGateway;
    }
    async execute(userData){

        const result= await this.userGateway.login(userData); 
        return result
    }
}

module.exports = Login;