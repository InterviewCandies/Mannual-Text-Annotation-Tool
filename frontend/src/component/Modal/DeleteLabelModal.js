import React,{Component} from 'react'
import {
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
import { removeLabel } from '../../functions/label.function';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
class DeleteLabelModal extends Component{
    constructor(props){
        super(props);
        this.state={
            id : this.props.data.id
        }
       this.toggle = this.props.toggle  
    }
    onClick =async (e)=>{
        const result =await removeLabel(this.state.id)
        if(result) toast.success('Label has been removed from this project and its documents')
        else toast.error('Error: Failed to delete this label')
        this.toggle()
        this.props.action()
        this.props.close()
    }
    componentDidUpdate(oldProps){
        const props = this.props
        if(oldProps.data.id!=props.data.id) {
           this.setState({
            id : props.data.id,
           })
        }
    }
    
       render(){
           return(
            <div>
                <ToastContainer></ToastContainer>
                <Modal isOpen={this.props.trigger} toggle={this.toggle}
                    className={'modal-danger ' + this.props.className}>
                <ModalHeader toggle={this.toggle}>Delete label</ModalHeader>
                <ModalBody>
                    <p>Do you really want to delete this label?</p>
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

export default DeleteLabelModal