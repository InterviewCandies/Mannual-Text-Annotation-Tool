const Label = require('../../domain/Label')
class LabelGateway {
      constructor({LabelModel}){
             this.LabelModel = LabelModel;
      }
      async createLabel(data){
            const {content,color,shortcut,project_id} = data;
            const label = {
                content : content,
                color: color,
                shortcut: shortcut,
                project_id: project_id
            }
            const result = await this.labelModel.insertMany(label);
            return result;
      }
      async deleteLabel(data){
          const {id} = data;
          const result = await this.labelModel.deleteOne({_id:id});
          return result;
      }
      async editLabel(data){
          const {id,content,color,shortcut,project_id} = data;
          const label = {
              content : content,
              color : color,
              shortcut : shortcut,
              project_id : project_id
          }
          const result = await this.labelModel.updateOne({_id:id},label);
          return result;
      }
      async listLabel(id){
          const result = await this.labelModel.find({project_id:id});
          return result;
      }
}

module.exports = LabelGateway;