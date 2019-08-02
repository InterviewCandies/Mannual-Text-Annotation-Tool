const LabelGateway = require('../../../infra/gateway/label.gateway')

class ListLabel {
      constructor(){
          this.labelGateway = new LabelGateway();
      }
      async execute(id){
          const result = this.labelGateway.listLabel(id);
          return result;
      }
}

module.exports = ListLabel;