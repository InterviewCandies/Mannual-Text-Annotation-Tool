import React,{Component} from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    
} from 'reactstrap'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { exportData} from '../../../functions/dataset.function';
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
        let result = await exportData(this.props.match.params.id,'json')
        if(result.response) {
            if(result.response.status==400) toast.error('Error: '+result.response.data.message)
        }
        else {
            if(result.url=='') { 
                toast.warn('Warning: No dataset to download')
            }
            else {
                const link = document.createElement('a');
                link.href = `${result.url}`;
                link.target = '_blank'
                link.download = result.url.split('/').pop()
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
        this.setState({
            jsonLoading : false
       })
    }
    onCSVClick=async(e)=>{
        this.setState({
            csvLoading : true
       })
        let result = await exportData(this.props.match.params.id,'csv')
        console.log(result)
        if(result.response) {
            if(result.response.status==400) toast.error('Error: '+result.response.data.message)
        }
        else {
            if(result.url=='') { 
                toast.warn('Warning: No dataset to download')
            }
            else {
                const link = document.createElement('a');
                link.href = `${result.url}`;
                link.target = '_blank'
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
        this.setState({
            csvLoading : false
       })
    } 
    render(){
        const {csvLoading,jsonLoading} = this.state
        return(
            <div>
                <Card className="m-sm-5" >
                    <CardHeader>
                        <h5>Export Dataset</h5>
                    </CardHeader>
                    <CardBody>
                        <strong>There are two data format you can download. the CSV and JSON</strong>
                    
                        <br></br>
                    
                        <div className="mt-sm-5">
                            {csvLoading? 
                                <Button color="primary"  disabled> <i className="fa fa-spinner fa-spin"></i> Download CSV file</Button>
                                :
                                <Button color="primary" onClick={this.onCSVClick}  >Download CSV file</Button>
                            }{' '}
                            {jsonLoading? 
                                <Button color="primary"  disabled> <i className="fa fa-spinner fa-spin"></i> Download JSON file</Button>
                                :
                                <Button color="primary" onClick={this.onJSONClick}  >Download JSON file</Button>
                            }
                        </div>
                    </CardBody>
                </Card>
            </div>
               
            
        )
    }
} 

export default ExportData