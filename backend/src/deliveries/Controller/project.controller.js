module.exports = class ProjectController {
     constructor({_listProject,_createProject,_deleteProject,_editProject,
                  _addUser,_removeUser,_getProjectByUser}){

          this._listProject = _listProject
          this._createProject = _createProject
          this._deleteProject = _deleteProject
          this._editProject =_editProject
          this._addUser = _addUser
          this._removeUser = _removeUser
          this._getProjectByUser = _getProjectByUser

          this.list= this.list.bind(this)
          this.createProject =this.createProject.bind(this)
          this.deleteProject = this.deleteProject.bind(this)
          this.updateProject = this.updateProject.bind(this)
          this.addUser = this.addUser.bind(this)
          this.removeUser = this.removeUser.bind(this)
          this.getProjectByUser = this.getProjectByUser.bind(this)
     }
     async list(req,res){
           const result  = await this._listProject.execute(req.body);
           try {
                res.status(200).json(result);
           } catch (error) {
                res.status(400).json(error);
           }
     }
     async createProject(req,res){


          const result = await this._createProject.execute(req.body);
          try{
               res.status(200).json(result);  

          } catch(e){
               res.status(400).send(error);
          }

     }
     async updateProject(req,res) {
            

           const result = await this._editProject.execute(req.body);
           try {
                   res.status(200).json(result);
           } catch (error) {
                  res.status(400).json(error);
           }
     }
     async deleteProject(req,res){
           const result = await this._deleteProject.execute(req.body);
           try{
               res.status(200).json(result);
           }
           catch(error){
               res.status(400).json(error);
           }
     }
     async addUser(req,res){
           const result =await this._addUser.execute(req.body);
           try {
                res.status(200).json(result);
           } catch (error) {
                res.status(400).json(error);
           }
     }
     async removeUser(req,res){
          const result = await this._removeUser.execute(req.body);
          try {
               res.status(200).json(result);
          } catch (error) {
               res.status(400).json(error);
          }
     }
     async getProjectByUser(req,res){
          const result = await this._getProjectByUser.execute(req.body);
          try {
               res.status(200).json(result);
          } catch (error) {
               res.status(400).json(error);
          }
     }
}