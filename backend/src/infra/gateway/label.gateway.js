class LabelGateway {
      constructor({LabelModel,labelMapper}){
             this.LabelModel = LabelModel;
             this.labelMapper = labelMapper
      }
      async create(req){
            const label =this.labelMapper.toDatabase(req.body)
            const result = await this.LabelModel.insertMany(label);
            return result.map( this.labelMapper.toEntity )
      }
      async delete(req){
          const id = req.params.id
          const result = await this.LabelModel.deleteOne({_id:id});
          return result.deletedCount==1;
      }
      async edit(req){
          const id =req.params.id
          const label = this.labelMapper.toDatabase(req.body)
          const result = await this.LabelModel.updateOne({_id:id},label);
          return result.nModified==1;
      }
      async list(req){
          const project_id = req.params.id
          const result = await this.LabelModel.find({project_id:project_id});
          return result.map( this.labelMapper.toEntity )
      }
}

module.exports = LabelGateway;