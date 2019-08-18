
class ListLabel {
      constructor({labelGateway}){
          this.labelGateway = labelGateway
      }
      async execute(data){
          const result = this.labelGateway.list(data);
          return result;
      }
}

module.exports = ListLabel;