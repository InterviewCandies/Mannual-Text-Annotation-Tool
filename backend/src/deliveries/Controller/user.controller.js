
class UserController {
      constructor({_login,_createUser,_deleteUser,_editUser,_getUser,_listUser, _getUserByProject }){

            this._login = _login
            this._createUser = _createUser
            this._deleteUser = _deleteUser
            this._editUser = _editUser
            this._getUser = _getUser
            this._listUser = _listUser
            this._getUserByProject  = _getUserByProject 

            this.login=this.login.bind(this)
            this.get = this.get.bind(this)
            this.list = this.list.bind(this)
            this.deleteUser = this.deleteUser.bind(this)
            this.createUser = this.createUser.bind(this)
            this.editUser = this.editUser.bind(this)
            this.getUserByProject= this.getUserByProject.bind(this)

      }
      async get(req,res){
            const result = await this._getUser.execute(req.body);
            try {
                  res.status(200).json(result);
            } catch (error) {
                  res.status(400).send(error);
            }
      }
      async list(req,res){
          
            const result = await this._listUser.execute(req.body); 
            try {
                  res.status(200).json(result);
                  
            } catch (error) {
                  res.status(400).send(error);
            }
         

     }

      async login(req,res){
            const result = await this._login.execute( req.body );
            
            try {
                  res.header('auth-token',result).send(result);

            } catch (error) {
                  res.status(400).send(error);  
            }
      }

      async createUser(req,res){

            const result = await this._createUser.execute(req.body);
            try {
                  res.status(200).json(result);
            } catch (error) {
                  res.status(400).send(error);
            }   
          
      }

      async deleteUser(req,res){
         
            const result = await this._deleteUser.execute(req.body);
            try {
            res.status(200).json(result);
            
            } catch (error) {
                  res.status(400).send(error);
            }
           
      }
      async editUser(req,res){
           
            const result = await this._editUser.execute(req.body);
            try {
                  res.status(200).json(result);
            } catch (error) {
                  res.status(400).send(error);
            }
           
      }
      async getUserByProject(req,res){
            const result= await this._getUserByProject.execute(req.body);
            try {
                 res.status(200).json(result);
            } catch (error) {
                 res.status(400).json(error);
            }
       }
      
}

module.exports=UserController;