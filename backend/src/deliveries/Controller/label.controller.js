const CreateLabel = require('../../application/usecase/labelManagement/createLabel.usecase')
const DeleteLabel = require('../../application/usecase/labelManagement/deleteLabel.usecase')
const EditLabel = require('../../application/usecase/labelManagement/editLabel.usecase')
const ListLabel = require('../../application/usecase/labelManagement/listLabel.usecase')
LabelController= {
      async createLabel(req,res){
            const {content,color,shortcut,project_id} = req.body;
            this.createLabel = new CreateLabel();
            const result = await this.createLabel.execute({content,color,shortcut,project_id});
            try {
                res.status(200).json(result);
            } catch (error) {
                res.status(400).send(error);
            }
      },
      async deleteLabel(req,res){
          const id = req.params.id;
          this.deleteLabel = new DeleteLabel();
          const result =await this.deleteLabel.execute({id});
          try {
              res.status(200).json(result);
          } catch (error) {
              res.status(400).send(error);
          }
      },
      async editLabel(req,res){
          const id = req.params.id;
          const {content,color,shortcut,project_id} = req.body;
          this.editLabel = new EditLabel();
          const result = await this.editLabel.execute({id,content,color,shortcut,project_id});
          try {
              res.status(200).json(result);
          } catch (error) {
              res.status(400).send(error);
          }
      },
      async list(req,res){
            const id = req.params.id;
            this.listLabel = new ListLabel();
            const result =await this.listLabel.execute(id);
            try {
                res.status(200).json(result);
            } catch (error) {
                res.status(400).send(error);
            }
      }
}

module.exports = LabelController;