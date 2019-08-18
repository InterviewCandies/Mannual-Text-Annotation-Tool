import React,{Component} from 'react'
import {
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
import { deleteProject, listUser, removeUser } from '../../functions/project.function';
class RemoveUserModal extends Component{
    constructor(props){
        super(props);
        this.state={
            id : this.props.data.id,
            user : '',
            users:this.props.users
        }
       this.toggle = this.props.toggle  
    }
    onChange=(e)=>{
         this.setState({
             user : e.target.value
         })
        document.getElementById('success').style.display='none'
        document.getElementById('failed').style.display='none'
    }
    onClick =async (e)=>{
        const result =await removeUser(this.state.user,this.state.id)
        if(result) document.getElementById('success').style.display='flex'
        else document.getElementById('failed').style.display='flex'
        this.props.action()
     
    }
    
    async componentDidUpdate(oldProps){
        const props = this.props
        if(oldProps.users!=props.users) {
           this.setState({
             id : props.data.id,
             users : props.users
           })
        }
      
    }
    
       render(){
           return(
                <Modal isOpen={this.props.trigger} toggle={this.toggle}
                    className={'modal-danger ' + this.props.className}>
                <ModalHeader toggle={this.toggle}>Remove user</ModalHeader>
                <ModalBody>
                    <select class="custom-select" onChange={this.onChange}>
                    <option selected>Choose...</option>
                    {this.state.users.map((user)=><option value={user.id}>{user.username}</option>)}
                    </select>
                    <div  id="success" className="my-sm-3" style={{display:'none'}}>
                        <h6 className="text-success "> 
                            <i className="fa fa-check-circle"></i> User has been removed from this project 
                        </h6>
                    </div>
                    <div  id="failed" className="my-sm-3"  style={{display:"none"}}>
                        <h6 className="text-danger"> 
                            <i className="fa fa-times-circle"></i> Failed to remove user
                        </h6>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.onClick}>Delete</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
               
               </Modal>

           )
       }
}

export default RemoveUserModal