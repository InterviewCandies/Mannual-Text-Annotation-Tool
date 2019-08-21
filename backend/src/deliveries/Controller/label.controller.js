
class LabelController {
      constructor({createLabel,deleteLabel,editLabel,listLabel}){
            this.createLabel = createLabel
            this.editLabel = editLabel
            this.deleteLabel = deleteLabel
            this.listLabel = listLabel

            this.create= this.create.bind(this)
            this.edit= this.edit.bind(this)
            this.delete = this.delete.bind(this)
            this.list= this.list.bind(this)
      }
      async create(req,res){
            const result = await this.createLabel.execute(req);
            try {
                res.status(200).json(result);
            } catch (error) {
                res.status(400).send(error);
            }
      }
      async delete(req,res){
          const result =await this.deleteLabel.execute(req);
          try {
              res.status(200).json(result);
          } catch (error) {
              res.status(400).send(error);
          }
      }
      async edit(req,res){
          const result = await this.editLabel.execute(req);
          try {
              res.status(200).json(result);
          } catch (error) {
              res.status(400).send(error);
          }
      }
      async list(req,res){
            const result =await this.listLabel.execute(req);
            try {
                res.status(200).json(result);
            } catch (error) {
                res.status(400).send(error);
            }
      }
}

module.exports = LabelController;