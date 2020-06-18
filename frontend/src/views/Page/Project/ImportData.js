import React,{Component} from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Button,
} from 'reactstrap'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { sendFile } from '../../../functions/dataset.function';
import txt from '../../../files/Sample.txt'
import jsonData from '../../../files/Sample'

class ImportData extends Component{
   
    constructor(props){
        super(props)
        this.state={
            filename: 'Choose file',
            fileList : [],
            loading : false
        }
    }
    onChange=(e)=>{
        let fileList =e.target.files;
        this.setState({
            filename : fileList[0]?fileList[0].name:'',
            fileList : fileList
        })
       
    }
    download =async(e)=>{
         
            const json = JSON.stringify(jsonData);
            const blob = new Blob([json],{type:'application/json'});
            const href = await URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = href;
            document.body.appendChild(link);
            link.download = "Sample.json"
            link.click();
            document.body.removeChild(link);
          
      }
    onUpload = async(e)=>{
        const { fileList } = this.state
        this.setState({
              loading : true
        })
        if(fileList.length !== 0) {
            const result = await sendFile(fileList[0], this.props.match.params.id)
           
            if(result.response) {
                if(result.response.status === 400) toast.error('Error: '+ result.response.data.message)
            }
            else { 
                toast.success('Success: File has been submited')
                if(result) { 
                    toast.info('Proccessing your file. It might take a while. Refresh to see changes')
                    this.setState({
                        loading :false
                   })
                    this.props.history.push(`/project/${this.props.match.params.id}/dataset`)
                }
            }
        }
        else toast.error('Error: No file selected');
        this.setState({
            loading :false
       })
    }
    render(){
        return(
          <div>
            <Card className="m-sm-5" >
                <CardHeader>
                    <h5>Import Dataset</h5>
                </CardHeader>
                <CardBody>
                    <strong>To annotate text, you need to import a set of text items</strong>
                    <ul>
                        <li>TXT file: each line should contain a text  
                        <a href={txt} download> (Sample txt file)</a>    
                        </li>
                        <li>JSON file: each line should contain a json object at least one key
                           <a  href='javascript:void(0);'  onClick={ this.download.bind(this) }> (Sample json file)</a>    
                        </li>
                        
                    </ul>
                    <br></br>
                 
                    <div class="custom-file col-sm-5">
                            <input type="file" 
                                   class="custom-file-input" 
                                   id="file" 
                                   style={{width:'5%'}}
                                   onChange={this.onChange} 
                                   />
                            <label class="custom-file-label" for="file" >{this.state.filename}</label>
                        </div>
                    <br></br>
                    <div className="mt-sm-5">
                        {this.state.loading? <Button color="primary" disabled> <i className="fa fa-spinner fa-spin"></i> Upload dataset</Button>
                        :<Button color="primary" onClick={this.onUpload}>Upload dataset</Button>
                        } {'  '}
                        <Button color="secondary">Cancel</Button>
                    </div>
                </CardBody>
            </Card>
          </div>
            
        )
    }
} 

export default ImportData