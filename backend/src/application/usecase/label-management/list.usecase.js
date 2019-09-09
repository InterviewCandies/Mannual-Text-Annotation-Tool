
class ListLabelUseCase {
      constructor({labelGateway}){
          this.labelGateway = labelGateway
      }
      async execute(project_id){
          const labels = await this.labelGateway.list(project_id);
          return labels;
      }
}

module.exports = ListLabelUseCase;