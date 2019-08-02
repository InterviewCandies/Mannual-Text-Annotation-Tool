const LabelModel = require('../database/label.model');
const Label = require('../../domain/Label')
const IDChecker= require('./IDChecker');
class LabelGateway {
      async createLabel(data){
            const {content,color,shortcut,project_id} = data;
            const label = {
                content : content,
                color: color,
                shortcut: shortcut,
                project_id: project_id
            }
            const result = await LabelModel.insertMany(label);
            return result;
      }
      async deleteLabel(data){
          const {id} = data;
          if(! IDChecker(id) ) return {};
          const result = await LabelModel.deleteOne({_id:id});
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
          const result = await LabelModel.updateOne({_id:id},label);
          return result;
      }
      async listLabel(id){
          if(!IDChecker(id)) return{};
          const result = await LabelModel.find({project_id:id});
          return result;
      }
}

module.exports = LabelGateway;