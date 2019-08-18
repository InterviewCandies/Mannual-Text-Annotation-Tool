import React,{Component} from 'react'
import {
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
import { editProject } from '../../functions/project.function';
import SuccessModal from './Success.modal';
class EditProjectModal extends Component{
    constructor(props){
        super(props);
        this.state = {
             id : this.props.data.id,
             name : this.props.data.project_name,
             description : this.props.data.project_description

        }
        this.onToggle = this.props.toggle
    }
    componentDidUpdate(oldProps){
        const props = this.props
        if(oldProps.data.id!=props.data.id) {
           this.setState({
            id : props.data.id,
            name : props.data.project_name,
            description : props.data.project_description
           })
        }
    }

    onChangeName=(e)=>{
        this.setState({
            name : e.target.value
        })
        document.getElementById('success').style.display="none"
        document.getElementById('failed').style.display="none"
    }
    onChangeDescription=(e)=>{
        this.setState({
            description : e.target.value
        })
        document.getElementById('success').style.display="none"
        document.getElementById('failed').style.display="none"
    }
    onSubmit = async (e)=>{
        e.preventDefault()
        const result =await editProject(this.state.id,this.state.name,this.state.description)
        if(result) document.getElementById('success').style.display="flex"
        else  document.getElementById('failed').style.display="flex"
        this.setState({
            name : '',
            description:''
        })
        this.props.action()
     
        
    }
       render(){
           return(
                <Modal isOpen={this.props.trigger} toggle={this.onToggle}
                    className={'modal-info ' + this.props.className}>
                <ModalHeader toggle={this.onToggle}>Edit project</ModalHeader>
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
                        <div class="form-group row" id="success" style={{display:"none"}}>
                            <h6 className="text-success col-sm-10 col-form-label"> 
                               <i className="fa fa-check-circle"></i> Edit project successfully
                            </h6>
                        </div>
                        <div class="form-group row" id="failed" style={{display:"none"}}>
                            <h6 className="text-danger col-sm-10 col-form-label"> 
                               <i className="fa fa-times-circle"></i> Failed to edit project
                            </h6>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={this.onSubmit}>Update</Button>{' '}
                    <Button color="secondary" onClick={this.onToggle}>Cancel</Button>
                  </ModalFooter>
               </Modal>

           )
       }
}

export default EditProjectModal