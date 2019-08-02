
const Login = require ('../../application/usecase/login.usecase')
const UserPresenter = require("../Presenter/user.presenter")
const CreateUser = require('../../application/usecase/userManagement/createUser.usecase')
const DeleteUser = require('../../application/usecase/userManagement/deleteUser.usecase')
const EditUser = require ('../../application/usecase/userManagement/editUser.usecase')
UserController= {
     
     

      async get(req,res){
      },

      async login(req,res){
            const {username,password} = req.body;

            this.login = new Login();
            this.userPresenter =new UserPresenter();
            
            const result = await this.login.execute( {username,password} );
            
            try {
                  res.status(200).json(result);

            } catch (error) {
                  res.status(400).send('Failed');  
            }
      },

      async createUser(req,res){
            const {username,password,role} = req.body;
            this.createUser = new CreateUser();
            const result = await this.createUser.execute({username,password,role});
            try {
                  res.status(200).json(result);
            } catch (error) {
                  res.status(400).send(error);
            }       
      },

      async deleteUser(req,res){
            const id = req.params.id;
            this.deleteUser = new DeleteUser();
            const result = await this.deleteUser.execute({id});
            try {
                res.status(200).json(result);
                 
            } catch (error) {
                  res.status(400).send(error);
            }
      },
      async editUser(req,res){
            const id = req.params.id;
            const {username,password,role} = req.body;
            this.editUser = new EditUser();
            const result = await this.editUser.execute({id,username,password,role});
            try {
                   res.status(200).json(result);
            } catch (error) {
                   res.status(400).send(error);
            }
      }
      
}

module.exports = UserController;