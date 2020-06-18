import React,{Component} from 'react'
import {
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
import { deleteProject } from '../../functions/project.function';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
class DeleteProjectModal extends Component{
    constructor(props){
        super(props);
        this.state={
            id : this.props.data.id
        }
       this.toggle = this.props.toggle;  
    }
    onClick = async() => {
        const result =await deleteProject(this.state.id);
        if(result) toast.success('Project has been removed successsfully');
        else toast.error('Error: Failed to delete this project');
        this.toggle();
        this.props.action();
    }
    componentDidUpdate(oldProps){
        const props = this.props;
        if(oldProps.data.id!=props.data.id) {
           this.setState({
            id : props.data.id,
           })
        }
    }
    render(){
        return(
            <div>
            <Modal isOpen={this.props.trigger} toggle={this.toggle}
                className={'modal-danger ' + this.props.className}>
            <ModalHeader toggle={this.toggle}>Delete project</ModalHeader>
            <ModalBody>
                <p>Do you really want to delete this project?</p>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={this.onClick}>Delete</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            
            </Modal>
            </div>
        )
    }
}

export default DeleteProjectModal