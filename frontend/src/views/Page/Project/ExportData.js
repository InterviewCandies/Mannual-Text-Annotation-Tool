import React,{Component} from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    
} from 'reactstrap'
import { exportData } from '../../../functions/dataset.function';
class ExportData extends Component{
    constructor(props){
        super(props)
        this.state={
            jsonLoading : false,
            csvLoading : false
        }
    }
    onJSONClick=async (e)=>{
        this.setState({
             jsonLoading : true
        })
        let result = await exportData(this.props.match.params.id)
        if(!result.length){
            alert('No dataset to download')
            return
        }
        const fileName = this.props.match.params.id;
        const json = JSON.stringify(result);
        const blob = new Blob([json],{type:'application/json;charset=utf-8;'});
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.setState({
            jsonLoading : false
       })
    }
    onCSVClick=async(e)=>{
        this.setState({
            csvLoading : true
       })
        let result = await exportData(this.props.match.params.id)
        if(!result.length){
             alert('No dataset to download')
             return
        }
         const fileName = this.props.match.params.id;
        const header = Object.keys(result[0])
        const replacer = (key, value) => value === null ? '' : value 
        let csv = result.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
        csv.unshift(header.join(','))
        csv = "\uFEFF"+csv.join('\r\n')
        const blob = new Blob([csv],{
            type: "text/csv;charset=utf-8;"
        });
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.setState({
            csvLoading : false
       })
    } 
    render(){
        return(
           
            <Card className="m-sm-5" >
                <CardHeader>
                    <h5>Export Dataset</h5>
                </CardHeader>
                <CardBody>
                    <strong>There are two data format you can download. the CSV and JSON</strong>
                   
                    <br></br>
                   
                    <div className="mt-sm-5">
                        <Button color="primary" onClick={this.onCSVClick}  disabled={this.state.csvLoading}>Download CSV file</Button>{' '}
                        <Button color="primary" onClick={this.onJSONClick} disabled={this.state.jsonLoading}>Download JSON file</Button>
                    </div>
                </CardBody>
            </Card>
            
               
            
        )
    }
} 

export default ExportData