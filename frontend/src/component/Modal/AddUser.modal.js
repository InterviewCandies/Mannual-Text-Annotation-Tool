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
        if(result.message) document.getElementById('warning').style.display="flex"
        else if(result) document.getElementById('success').style.display="flex"
        else document.getElementById('failed').style.display="flex"
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
        document.getElementById('warning').style.display="none"
        document.getElementById('success').style.display="none"
        document.getElementById('failed').style.display="none"
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
        
            <div  id="success" className="my-sm-3" style={{display:'none'}}>
                <h6 className="text-success "> 
                    <i className="fa fa-check-circle"></i> User has been added to this project
                </h6>
            </div>
            <div  id="warning" className="my-sm-3" style={{display:'none'}}>
                <h6 className="text-warning "> 
                    <i className="fa fa-exclamation-circle"></i> User is already in this project
                </h6>
            </div>
            <div  id="failed" className="my-sm-3"  style={{display:"none"}}>
                <h6 className="text-danger"> 
                    <i className="fa fa-times-circle"></i> Failed to add user 
                </h6>
            </div>
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