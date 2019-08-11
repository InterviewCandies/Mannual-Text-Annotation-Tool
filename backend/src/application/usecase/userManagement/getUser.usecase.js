
class getUser{
      constructor({userGateway}){
          this.userGateway =userGateway
      }   
      async execute(data){
          const result =await this.userGateway.get(data);
          return result; 
      }
}

module.exports = getUser