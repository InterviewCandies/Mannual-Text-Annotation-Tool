import React,{Component} from 'react'
import {
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
import { removeUser } from '../../functions/project.function';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
class RemoveUserModal extends Component{
    constructor(props){
        super(props);
        this.state={
            id : this.props.data.id,
            user : '',
            users:this.props.users
        }
       this.toggle = this.props.toggle;
    }
    onChange = (e) => {
         this.setState({
             user : e.target.value
         })
       
    }
    onClick = async() => {
        const result = await removeUser(this.state.user,this.state.id);
        if(result) toast.success('User has been removed from this project');
        else toast.warn('Error: Failed to remove user');
        this.toggle();
        this.props.action();
     
    }
    
    async componentDidUpdate(oldProps) {
        const props = this.props;
        if(oldProps.data != props.data || oldProps.users != props.users) {
           this.setState({
             id : props.data.id,
             users : props.users
           })
        }
      
    }
    
       render(){
           return(
               <div>
                <Modal isOpen={this.props.trigger} toggle={this.toggle}
                    className={'modal-danger ' + this.props.className}>
                <ModalHeader toggle={this.toggle}>Remove user</ModalHeader>
                <ModalBody>
                    <select class="custom-select" onChange={this.onChange}>
                    <option selected>Choose...</option>
                    {this.state.users.map((user)=><option value={user.id}>{user.username}</option>)}
                    </select>
                   
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

export default RemoveUserModal