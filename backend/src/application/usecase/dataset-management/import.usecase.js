const fs = require('fs')
const util = require('util')
const readline = require('readline');
class ImportDataUseCase {
  constructor({ datasetGateway }) {
    this.datasetGateway = datasetGateway;
  }

   

  async execute(project_id, file, fileType) {
    //json
    if(fileType=='json') {
      let dataset = require('../../../uploads/'+file.filename)
      dataset = dataset.map((document) =>  document.text)
      

      const forLoop = async (dataset) => {
        let temp=[]
        let i=0;
        for (let document of dataset) {
          temp.push(document);
          i++;
          if(i%1000 ==0 ) {
              await this.datasetGateway.importData(project_id,temp)
              temp=[]
          } 
        }
        return temp
      }
      const rest = await forLoop(dataset)
      await this.datasetGateway.importData(project_id,rest)
      return dataset
    }
    else {
      //txt file
      const that =this;

      const rl = readline.createInterface({
      input : fs.createReadStream(file.path),
      output: process.stdout,
      terminal: false,
      })
      let num=0;
      let dataset=[]
      let paused = false
      let datasetTmp =[]
     
      rl.on('line',function(line){
          num++;
          if(paused) datasetTmp.push(line)
          else dataset.push(line)
          if(num%1000==0) rl.pause()
      })
      rl.on('pause',async function(){
          paused =true
          await that.datasetGateway.importData(project_id,dataset)
          dataset =[]
          dataset = [...datasetTmp]
          datasetTmp =[]
          rl.resume()
      })
      rl.on('resume',function(){  paused=false });
     
      rl.on('close', async function() { 
        await that.datasetGateway.importData(project_id,dataset)
      })
      return dataset
        
    }
  }

}

module.exports = ImportDataUseCase;
