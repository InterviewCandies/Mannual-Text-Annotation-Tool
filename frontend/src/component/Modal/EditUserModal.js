import React,{Component} from 'react'
import {
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
import { createUser, editUser } from '../../functions/user.function';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
class EditUserModal extends Component{
    constructor(props){
        super(props);
        this.state = {
             id : this.props.data.id,
             username :  this.props.data.username,
             password : this.props.data.password,
             role: this.props.data.role
        }
        this.onToggle = this.props.toggle
    }
 
    componentDidUpdate(oldProps){
        const props = this.props
        if(oldProps.data!=props.data) {
           this.setState({
            id : props.data.id,
            username : props.data.username,
            password : props.data.password,
            role : props.data.role
           })
        }
    }

    onChangeUsername=(e)=>{
        this.setState({
            username : e.target.value
        })
       
    }
    onChangePassword=(e)=>{
        this.setState({
            password : e.target.value
        })
      
    }
  
    onChangeRole=(e)=>{
        this.setState({
             role : !this.state.role
        })
    }
    onSubmit = async (e)=>{
        e.preventDefault()
        const {id,username,password,role} = this.state
        if(username =='') {
              toast.error('Error: Username is required')
              return
        }
        if(password =='') {
            toast.error('Error: Password is required')
            return
       }
        const result =await editUser(id,username,password,role)
        if(result.message) {
             toast.warn('Warning '+ result.message)
             this.setState( {
                id : this.props.data.id,
                username :  this.props.data.username,
                password : this.props.data.password,
                role: this.props.data.role
             })
             return
        }
        toast.success('User profile has been updated')
       
          
        this.onToggle()
        this.props.action()
    }
       render(){
           return(
                <Modal isOpen={this.props.trigger} toggle={this.onToggle}
                    className={'modal-info ' + this.props.className}>
                <ModalHeader toggle={this.onToggle}>Edit profile</ModalHeader>
                <ModalBody>
                  <form>
                        <div class="form-group row">
                            <label  for="username" class="col-sm-2 col-form-label">Username:</label>
                            <div class="col-sm-10">
                                <input type="text" 
                                        className="form-control" 
                                        id="username" 
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="password" class="col-sm-2 col-form-label">Password:</label>
                            <div class="col-sm-10">
                            <input type="password" 
                                    className="form-control" 
                                    id="password" 
                                    value={this.state.password}
                                    onChange={this.onChangePassword}/>
                            </div>
                        </div>
                        
                        <div class="form-group row">
                        <div class="form-check ml-sm-3">
                            <input class="form-check-input" 
                                   type="checkbox" value="admin" 
                                   id="check" 
                                   checked={this.state.role}
                                   onClick={this.onChangeRole}/>
                                <label class="form-check-label" for="check">
                                    Set as adminstrator
                                </label>
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

export default EditUserModal