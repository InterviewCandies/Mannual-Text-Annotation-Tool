const fs = require('fs')
const util = require('util')
const readline = require('readline');
class ImportDataUseCase {
  constructor({ datasetGateway, fileHandler }) {
    this.datasetGateway = datasetGateway;
    this.fileHandler = fileHandler
  }

  async execute(project_id, file, fileType) {
    //json
    if(fileType=='json') {
      let dataset = require('../../../uploads/'+file.filename)
      dataset = dataset.map((document) =>  document.text)
      let i=0;
      let temp=[]
      while(i<dataset.length) {
         temp.push(dataset[i]);
          i++;
          if(i%1000 ==0 ) {
              await this.datasetGateway.importData(project_id,temp)
              temp=[]
          } 
      }
      await this.datasetGateway.importData(project_id,temp)
      return dataset
    }
    else {
      //txt file
      const that =this;
      const rl = readline.createInterface({
      input : fs.createReadStream(file.path),
      output: process.stdout,
      terminal: false
      })
      let num =0;
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
        return 1
      })
      return 0
    }
  }

}

module.exports = ImportDataUseCase;
