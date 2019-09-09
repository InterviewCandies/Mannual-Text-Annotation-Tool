import React,{Component} from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Button,
} from 'reactstrap'
import { sendFile } from '../../../functions/dataset.function';
import txt from '../../../files/Sample.txt'
import jsonData from '../../../files/Sample'

class ImportData extends Component{
    constructor(props){
        super(props)
        this.state={
            filename: 'Choose file',
            fileList : []
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
            link.target ='_blank'
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          
      }
    onClick=async (e)=>{
        const {fileList} = this.state
        if(fileList.length!=0) {
            const result =await sendFile(fileList[0],this.props.match.params.id)
            if(result.response) {
                if(result.response.status==400) alert(result.response.data.message)
                
            }
            else { 
                alert('File has been submited')
                this.props.history.push(`/project/${this.props.match.params.id}/dataset`)
            }
            this.setState({
                filename : 'Choose file'
            })
        }
        else alert('No file selected')
    }
    render(){
        return(
           
            <Card className="m-sm-5" >
                <CardHeader>
                    <h5>Import Dataset</h5>
                </CardHeader>
                <CardBody>
                    <strong>To annotate text, you need to import a set of text items</strong>
                    <ul>
                        <li>TXT file: each line should contain a text  
                        <a href={txt}  target="_blank"> (Sample txt file)</a>    
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
                        <Button color="primary" onClick={this.onClick}>Upload dataset</Button>{' '}
                        <Button color="secondary">Cancel</Button>
                    </div>
                </CardBody>
            </Card>
            
               
            
        )
    }
} 

export default ImportData