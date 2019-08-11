import React, {Component} from 'react'
import  {createUser} from '../../functions/user.function'
import {
   Button,
   ButtonGroup
} from 'reactstrap'
class CreateUserForm extends Component {
    constructor(props){
        super(props)
        this.state={
            username : '',
            password : '',
            role : 0
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeUsername=(e)=>{
        this.setState({
            username: e.target.value
        })
    }
    onChangePassword=e=>{
        this.setState({
           password : e.target.value
        })
    }
    async onSubmit(e){
           e.preventDefault();
           await createUser(this.state.username,this.state.password,this.state.role)

    }
   
    render(){
        return (
            <form onSubmit={this.onSubmit}>
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
              <label for="Password" class="col-sm-2 col-form-label">Password:</label>
              <div class="col-sm-10">
              <input type="password" 
                     className="form-control" 
                     id="Password" 
                     value={this.state.password}
                     onChange={this.onChangePassword}/>
              </div>

            </div>
           <div className="form-group row">
                <div class="col-sm-10 form-check">
                    <input type="checkbox" class="form-check-input col-sm-1 " id="role" onChange={e=>{this.setState({role : !this.state.role})}}/>
                    <label class="form-check-label col-sm-10" for="role"> Set as Adminstrator</label>
                </div>
            </div> 
            <div className="float-right">
                <Button color="primary" onClick={this.props.toggle} type="submit">Submit</Button>{'   '}
                <Button color="secondary" onClick={this.props.toggle}>Cancel</Button> 
            </div>
                      
           
          </form>
        )
    }
}


export default CreateUserForm;