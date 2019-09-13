import React,{Component} from 'react'
import {
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
import { deleteDocument } from '../../functions/dataset.function';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
class DeleteDocumentModal extends Component{
    constructor(props){
        super(props);
        this.state={
            id : this.props.data.id
        }
       this.toggle = this.props.toggle  
    }
    onClick =async (e)=>{
        const result = await deleteDocument(this.state.id)
        if(result) toast.success('Document has been removed from dataset')
        else toast.error('Error: Failed to delete thid document')
        this.toggle()
        this.props.action()
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
                <ModalHeader toggle={this.toggle}>Delete document</ModalHeader>
                <ModalBody>
                    <p>Do you really want to delete this document?</p>
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

export default DeleteDocumentModal