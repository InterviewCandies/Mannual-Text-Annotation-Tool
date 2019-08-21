import React,{Component} from 'react'
import {
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
import { deleteProject, listUser, addUser } from '../../functions/project.function';
import { UserList } from '../../functions/user.function';
class AddUserModal extends Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.data.id,
            users: [],
            user : ''
        }
       this.toggle = this.props.toggle  
    }
    onClick =async (e)=>{
        const result =await addUser(this.state.user,this.state.id)
        if(result.message) alert('User is already in this project')
        else if(result) alert('User has been added to this project')
        else alert('Failed to add user to this project')
        this.toggle()
        this.props.action()
    }
    async componentDidMount(){
         this.setState({
             users : await UserList()
         })        
    }
    componentDidUpdate(oldProps){
        const props = this.props
        if(oldProps.data.id!=props.data.id) {
           this.setState({
            id : props.data.id,
           })
        }
    }
    onChange=async (e)=>{
        this.setState({
           user : e.target.value
        })
       
    }
    render(){
        return(
            <Modal isOpen={this.props.trigger} toggle={this.toggle}
                className={'modal-info ' + this.props.className}>
            <ModalHeader toggle={this.toggle}>Add new user</ModalHeader>
            <ModalBody>
            
                <select class="custom-select " onChange={this.onChange}>
                    <option selected>Choose...</option>
                    {this.state.users.map((user)=><option value={user.id}>{user.username}</option>)}
                </select>
        
            
            </ModalBody>
            <ModalFooter>
                <Button color="info" onClick={this.onClick}>Add</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            
            </Modal>

        )
    }
}

export default AddUserModal