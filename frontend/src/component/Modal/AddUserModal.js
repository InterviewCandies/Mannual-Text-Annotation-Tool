import React,{Component} from 'react'
import Select from 'react-select'
import {
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader,
} from 'reactstrap'
import { addUser } from '../../functions/project.function';
import { userList } from '../../functions/user.function';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
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
       
        const result =await addUser(this.state.user.value,this.state.id)
        this.setState({ user:{}})
        if(result.response) {
            if(result.response.status==400) toast.error('Error: '+ result.response.data.message)
            
        }
        else toast.success('User has been added to this project')
        this.toggle()
        this.props.action()
    }
    async componentDidMount(){
         let result= await userList(0,0,'username',1)
         this.setState({
             users : result.users || []
         })     
       
         let users = this.state.users 
         users = users.map(user=> user={value:user.id,label:user.username})
         this.setState({
             users:users
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
    onToggle=(e)=>{
        e.stopPropagation();
        this.toggle()
    }
    onhandleChange=user =>{
        this.setState({user})
    }
    render(){
        const options = this.state.users
        return(
           <div>
            <ToastContainer></ToastContainer>
            <Modal isOpen={this.props.trigger} toggle={this.toggle} 
                className={'modal-info ' + this.props.className} onClick={(e)=>{e.stopPropagation()}} >
            <ModalHeader toggle={this.toggle}>Add new user</ModalHeader>
            <ModalBody>
                <Select  value={this.state.user}
                         onChange={this.onhandleChange}
                         options={options}  
                ></Select>
            </ModalBody>
            <ModalFooter>
                <Button color="info" onClick={this.onClick}>Add</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            
            </Modal>
        </div> 
        )
    }
}

export default AddUserModal