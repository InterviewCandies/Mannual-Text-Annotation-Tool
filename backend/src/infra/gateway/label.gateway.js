const LabelModel = require('../database/label.model');
const Label = require('../../domain/Label')
class LabelGateway {
      async createLabel(data){
            const {content,color,shorcut,project_id} = data;
            const label = {
                content : content,
                color: color,
                shorcut: shorcut,
                project_id: project_id
            }
            const result = await LabelModel.insertMany(label);
            return result;
      }
}

module.exports = LabelGateway;