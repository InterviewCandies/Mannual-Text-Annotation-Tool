const CreateLabel = require('../../application/usecase/labelManagement/createLabel.usecase')
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
      }
}

module.exports = LabelController;