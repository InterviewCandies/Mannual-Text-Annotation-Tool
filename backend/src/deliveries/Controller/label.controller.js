
class LabelController {
      constructor({_createLabel,_deleteLabel,_editLabel,_listLabel}){
            this._createLabel = _createLabel
            this._editLabel = _editLabel
            this._deleteLabel = _deleteLabel
            this._listLabel = _listLabel

            this.create= this.create.bind(this)
            this.edit= this.edit.bind(this)
            this.delete = this.delete.bind(this)
            this.list= this.list.bind(this)
      }
      async create(req,res){
            const result = await this._createLabel.execute(req);
            try {
                res.status(200).json(result);
            } catch (error) {
                res.status(400).send(error);
            }
      }
      async delete(req,res){
          const result =await this._deleteLabel.execute(req);
          try {
              res.status(200).json(result);
          } catch (error) {
              res.status(400).send(error);
          }
      }
      async edit(req,res){
          const result = await this._editLabel.execute(req);
          try {
              res.status(200).json(result);
          } catch (error) {
              res.status(400).send(error);
          }
      }
      async list(req,res){
            const result =await this._listLabel.execute(req);
            try {
                res.status(200).json(result);
            } catch (error) {
                res.status(400).send(error);
            }
      }
}

module.exports = LabelController;