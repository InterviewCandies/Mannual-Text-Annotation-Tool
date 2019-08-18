import React,{Component} from 'react'
import {
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
import { editProject, createProject } from '../../functions/project.function';
class CreateProjectModal extends Component{
    constructor(props){
        super(props);
        this.state = {
             name : '',
             description : ''
        }
        this.onToggle = this.props.toggle
    }
 

    onChangeName=(e)=>{
        this.setState({
            name : e.target.value
        })
        document.getElementById('success').style.display='none'
        document.getElementById('failed').style.display='none'
    }
    onChangeDescription=(e)=>{
        this.setState({
            description : e.target.value
        })
        document.getElementById('success').style.display='none'
        document.getElementById('failed').style.display='none'
    }
    onSubmit = async (e)=>{
        e.preventDefault()
        const result =await createProject(this.state.name,this.state.description)
        this.setState({
            name:'',
            description:''
        })
        if(result) document.getElementById('success').style.display='flex'
        else document.getElementById('failed').style.display='flex'
        //this.onToggle()
        this.props.action()
    }
       render(){
           return(
                <Modal isOpen={this.props.trigger} toggle={this.onToggle}
                    className={'modal-info ' + this.props.className}>
                <ModalHeader toggle={this.onToggle}>Create new project</ModalHeader>
                <ModalBody>
                  <form>
                        <div class="form-group row">
                        <label  for="projectname" class="col-sm-2 col-form-label">Name:</label>
                        <div class="col-sm-10">
                            <input type="text" 
                                    className="form-control" 
                                    id="projectname" 
                                    value={this.state.name}
                                    onChange={this.onChangeName}/>
                        </div>
                        </div>
                        <div class="form-group row">
                        <label for="Description" class="col-sm-2 col-form-label">Description:</label>
                        <div class="col-sm-10">
                        <input type="text" 
                                className="form-control" 
                                id="Description" 
                                value={this.state.description}
                                onChange={this.onChangeDescription}/>
                        </div>
                        </div>
                    
                    </form>
                    <div  id="success" className="my-sm-3" style={{display:'none'}}>
                        <h6 className="text-success "> 
                            <i className="fa fa-check-circle"></i> Project has been added to list
                        </h6>
                    </div>
                   
                    <div  id="failed" className="my-sm-3"  style={{display:"none"}}>
                        <h6 className="text-danger"> 
                            <i className="fa fa-times-circle"></i> Failed to create new project 
                        </h6>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={this.onSubmit}>Create</Button>{' '}
                    <Button color="secondary" onClick={this.onToggle}>Cancel</Button>
                  </ModalFooter>
               </Modal>

           )
       }
}

export default CreateProjectModal