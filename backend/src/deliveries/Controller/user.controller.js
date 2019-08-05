const User = require('../../application/usecase/userManagement')
const Authentication = require('../../infra/util/JWT');  // JWT Interface
UserController= {
     
      async get(req,res){
      },

      async login(req,res){
            const {username,password} = req.body;
             
            this.login = new User.Login();
            
            const result = await this.login.execute( {username,password} );
            
            // Create JWT Token 
            token = Authentication.sign(result);

            try {
                  res.status(200).send(token);

            } catch (error) {
                  res.status(400).send({message : "Failed to connect with server"});  
            }
      },

      async createUser(req,res){

            const auth = await Authentication.vertify(req);
             
            if(!auth ) {
                  res.status(401).json({message : "Authentication failed"});    
            }
            else {
                  const {username,password,role} = req.body;

                  this.createUser = new User.CreateUser();
                  const result = await this.createUser.execute({username,password,role});
                  try {
                        res.status(200).json(result);
                  } catch (error) {
                        res.status(400).send(error);
                  }   
            }

      },

      async deleteUser(req,res){
            const auth = await Authentication.vertify(req);
             
            if(!auth ) {
                  res.status(401).json({message : "Authentication failed"});    
            }
            else {
                  const id = req.params.id;
                  this.deleteUser = new User.DeleteUser();
                  const result = await this.deleteUser.execute({id});
                  try {
                  res.status(200).json(result);
                  
                  } catch (error) {
                        res.status(400).send(error);
                  }
            }
      },
      async editUser(req,res){
            const auth = await Authentication.vertify(req);
             
            if(!auth ) {
                  res.status(401).json({message : "Authentication failed"});    
            }
            else {
                  const id = req.params.id;
                  const {username,password,role} = jwt.decoder(req);
                  this.editUser = new User.EditUser();
                  const result = await this.editUser.execute({id,username,password,role});
                  try {
                        res.status(200).json(result);
                  } catch (error) {
                        res.status(400).send(error);
                  }
            }
      }
      
}

module.exports = UserController;