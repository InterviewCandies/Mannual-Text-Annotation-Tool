module.exports = class ProjectController {
     constructor({_listProject,_createProject,_deleteProject,_editProject,
                  _addUser,_removeUser,_getProjectByUser,searchProject,_userSearchProject}){

          this._listProject = _listProject
          this._createProject = _createProject
          this._deleteProject = _deleteProject
          this._editProject =_editProject
          this._addUser = _addUser
          this._removeUser = _removeUser
          this._getProjectByUser = _getProjectByUser
          this.searchProject = searchProject
          this._userSearchProject = _userSearchProject

          this.list= this.list.bind(this)
          this.create =this.create.bind(this)
          this.delete= this.delete.bind(this)
          this.update = this.update.bind(this)
          this.addUser = this.addUser.bind(this)
          this.removeUser = this.removeUser.bind(this)
          this.search = this.search.bind(this)
          this.getProjectByUser = this.getProjectByUser.bind(this)
          this.userSearchProject = this.userSearchProject.bind(this)
     }
     async list(req,res){
           
           const result  = await this._listProject.execute(req);
           try {
                res.status(200).json(result);
           } catch (error) {
                res.status(400).json(error);
           }
     }
     async create(req,res){

          const result = await this._createProject.execute(req);
          try{
               res.status(200).json(result);  

          } catch(e){
               res.status(400).send(error);
          }

     }
     async update(req,res) {
            

           const result = await this._editProject.execute(req);
           try {
                   res.status(200).json(result);
           } catch (error) {
                  res.status(400).json(error);
           }
     }
     async delete(req,res){
           const result = await this._deleteProject.execute(req);
           try{
               res.status(200).json(result);
           }
           catch(error){
               res.status(400).json(error);
           }
     }
     async search(req,res){
          const result = await this.searchProject.execute(req)
          try{
               res.status(200).json(result);
           }
           catch(error){
               res.status(400).json(error);
           }
     }
     async addUser(req,res){
           const result =await this._addUser.execute(req);
           try {
                res.status(200).json(result);
           } catch (error) {
                res.status(400).json(error);
           }
     }
     async removeUser(req,res){
          const result = await this._removeUser.execute(req);
          try {
               res.status(200).json(result);
          } catch (error) {
               res.status(400).json(error);
          }
     }
     async getProjectByUser(req,res){
          const result = await this._getProjectByUser.execute(req);
          try {
               res.status(200).json(result);
          } catch (error) {
               res.status(400).json(error);
          }
     }
     async userSearchProject(req,res){
          const result = await this._userSearchProject.execute(req)
          try{
               res.status(200).json(result);
           }
           catch(error){
               res.status(400).json(error);
           }
     }
}