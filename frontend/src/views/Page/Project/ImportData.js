import React,{Component} from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Container
} from 'reactstrap'
import navigation from '../../../navRoutes/ProjectNav';
import SideBar from '../../../component/SideBar/SideBar'
import { sendFile } from '../../../functions/dataset.function';
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
            filename : fileList[0].name,
            fileList : fileList
        })
       
    }
    onClick=(e)=>{
        const {fileList} = this.state
        if(fileList.length!=0) {
            sendFile(fileList[0],this.props.match.params.id)
            alert('File has been submited')
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
                        <li>TXT file: each line should contain a text</li>
                        <li>JSON file: each line should contain a json object at least one key</li>
                        
                    </ul>
                    <br></br>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked/>
                        <label class="form-check-label" for="exampleRadios1">
                            Upload a TXT file from your computer
                        </label>
                    </div>
                    <div class="form-check mb-sm-2">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
                        <label class="form-check-label" for="exampleRadios2">
                            Upload a JSON file from your computer
                        </label>
                    </div>
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