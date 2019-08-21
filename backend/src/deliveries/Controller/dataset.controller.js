
class DatasetController {
    constructor( {_importData,listDocument,editDocument,deleteDocument,verifyDocument,searchDocument} ){
          this._importData=_importData
          this.listDocument = listDocument
          this.editDocument = editDocument
          this.deleteDocument = deleteDocument
          this.verifyDocument = verifyDocument
          this.searchDocument = searchDocument

          this.importData= this.importData.bind(this)
          this.list = this.list.bind(this)
          this.edit =this.edit.bind(this)
          this.delete =this.delete.bind(this)
          this.verify = this.verify.bind(this)
          this.search = this.search.bind(this)
    }
    async importData(req,res){
          const result = await this._importData.execute(req);
          try {
              res.status(200).json(result);
          } catch (error) {
              res.status(400).send(error);
          }
    }
   async list(req,res){
         const result = await this.listDocument.execute(req)
         try {
            res.status(200).json(result);
        } catch (error) {
            res.status(400).send(error);
        }
   }
   async edit(req,res){
        const result = await this.editDocument.execute(req)
        try{
            res.status(200).json(result);
        } catch (error) {
            res.status(400).send(error);
        }   
   }
   async delete(req,res){
        const result = await this.deleteDocument.execute(req)
        try{
            res.status(200).json(result);
        } catch (error) {
            res.status(400).send(error);
        }   
   }
   async search(req,res){
        const result = await this.searchDocument.execute(req)
        try{
            res.status(200).json(result);
        } catch (error) {
            res.status(400).send(error);
        }   
    }
   async verify(req,res){
        const result = await this.verifyDocument.execute(req)
        try{
            res.status(200).json(result);
        } catch (error) {
            res.status(400).send(error);
        }   
   }
}

module.exports =DatasetController;