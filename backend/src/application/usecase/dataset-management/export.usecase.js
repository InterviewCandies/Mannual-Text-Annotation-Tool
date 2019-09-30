const fs = require('fs')
const util = require('util');
const config = require('config')
class ExportDataUseCase {
  constructor({ datasetGateway }) {
    this.datasetGateway = datasetGateway;
  }

  toCSV(data){
    const header = ['content','labels','user']
    const replacer = (key, value) => value == null? '' : value 
    let csv = data.map(row => header.map(fieldName => {  
            let labels= JSON.stringify(row[fieldName], replacer) 
            if(labels=='[]') labels=null; return labels;} 
        ).join(',')   
    )
    csv.unshift(header.join(','))
    csv = "\uFEFF"+csv.join('\r\n')
    return csv
  }

  toJson(data){
    const json = JSON.stringify(data);
    return json
  }

  async execute(project_id,fileType) {
    const documents = await this.datasetGateway.exportData(project_id)
    if(!documents.length) return {url:''}
    if(fileType == 'csv') {
      const csv = this.toCSV(documents)
      const writeFile = util.promisify(fs.writeFile);
      await writeFile(`files/${project_id}.csv`,csv)
    }
    else {
      const json = this.toJson(documents)
      const writeFile = util.promisify(fs.writeFile);
      await writeFile(`files/${project_id}.json`,json)
    }
    const url = config.get('Server.IP')+`${project_id}.${fileType}`
    return {url};
  }
}

module.exports = ExportDataUseCase;
