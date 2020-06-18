import React,{Component} from 'react'
import {
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
import { editProject } from '../../functions/project.function';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
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
    componentDidUpdate(oldProps) {
        const props = this.props
        if(oldProps.data!=props.data) {
           this.setState({
            id : props.data.id,
            name : props.data.project_name,
            description : props.data.project_description
           })
        }
    }

    onChangeName= (e) => {
        this.setState({
            name : e.target.value
        })
     
    }
    onChangeDescription= (e) => {
        this.setState({
            description : e.target.value
        })
        
    }
    onSubmit = async(e )=> {
        e.preventDefault();
        const { id,name,description } = this.state
        if(name === '') {
              toast.error('Error: Project\'s name is required');
              return;
        }
        const result = await editProject(id,name,description);
        if(result) toast.success('Project has been updated');
        else toast.error('Error: Failed to update this project');
        this.onToggle();
        this.props.action();
     
        
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

export default EditProjectModal;