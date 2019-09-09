import React,{Component} from 'react'
import {
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
import { deleteUser } from '../../functions/user.function';
class DeleteUserModal extends Component{
    constructor(props){
        super(props);
        this.state={
            id : this.props.data.id
        }
       this.toggle = this.props.toggle  
    }
    onClick =async (e)=>{
        const result =await deleteUser(this.state.id)
        if(result) alert('User has been removed successsfully')
        else alert('Failed to delete this user')
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
                <Modal isOpen={this.props.trigger} toggle={this.toggle}
                    className={'modal-danger ' + this.props.className}>
                <ModalHeader toggle={this.toggle}>Delete user</ModalHeader>
                <ModalBody>
                    <p>Do you really want to delete this user?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.onClick}>Delete</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
               
               </Modal>

           )
       }
}

export default DeleteUserModal