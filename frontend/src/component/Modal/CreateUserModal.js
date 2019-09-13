import React,{Component} from 'react'
import {
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
import { createUser } from '../../functions/user.function';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
class CreateUserModal extends Component{
    constructor(props){
        super(props);
        this.state = {
             username : '',
             password1 : '',
             password2 : '',
             role:0
        }
        this.onToggle = this.props.toggle
    }
 

    onChangeUsername=(e)=>{
        this.setState({
            username : e.target.value
        })
       
    }
    onChangePassword1=(e)=>{
        this.setState({
            password1 : e.target.value
        })
      
    }
    onChangePassword2=(e)=>{
        this.setState({
            password2 : e.target.value
        })
      
    }
    onChangeRole=(e)=>{
        this.setState({
             role : !this.state.role
        })
    }
    onSubmit = async (e)=>{
        e.preventDefault()
        const {username,password1,password2,role} = this.state
        if(username ==''){
              toast.error('Error: Username is required')
              return
        }
        if(password1==''){
              toast.error('Error: Password is required')
              return
        }
        if(password1!==password2){ 
            toast.error('Error: Password is not correct')
            return
        }
        const result =await createUser(username,password1,role)
        if(result.response) {
            if(result.response.status==400) toast.error('Error ' +result.response.data.message)
        }
        else toast.success('User has been created')
        this.setState({
            username :'',
            password1:'',
            password2:'',
            role:0
        })
          
        this.onToggle()
        this.props.action()
    }
       render(){
           return(
               <div>
                <ToastContainer></ToastContainer>
                <Modal isOpen={this.props.trigger} toggle={this.onToggle}
                    className={'modal-success ' + this.props.className}>
                <ModalHeader toggle={this.onToggle}>Create new user</ModalHeader>
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
                            <label for="password1" class="col-sm-2 col-form-label">Password:</label>
                            <div class="col-sm-10">
                            <input type="password" 
                                    className="form-control" 
                                    id="password1" 
                                    value={this.state.password1}
                                    onChange={this.onChangePassword1}/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="password2" class="col-sm-2 col-form-label">Confirm password:</label>
                            <div class="col-sm-10">
                            <input type="password" 
                                    className="form-control" 
                                    id="password2" 
                                    value={this.state.password2}
                                    onChange={this.onChangePassword2}/>
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
                    <Button color="success" onClick={this.onSubmit}>Create</Button>{' '}
                    <Button color="secondary" onClick={this.onToggle}>Cancel</Button>
                  </ModalFooter>
               </Modal>
            </div>
           )
       }
}

export default CreateUserModal