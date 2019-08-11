import React,{Component} from 'react'
import UsersTable from '../../../component/Table/Users/UsersTable';
import {createUser} from '../../../functions/user.function'
import {
    Alert,
    Button
} from 'reactstrap'
import InfoModal from '../../../component/Modal/Info.modal'
import CreateUserForm from '../../../component/Form/CreateUserForm';
class Users extends Component{
    constructor(props){
        super(props)
        this.state={
            createUser : false
        }
        this.onCreateUserClick= this.onCreateUserClick.bind(this)
    }
    async onCreateUserClick(e){
        this.setState({
            createUser :!this.state.createUser
        })
    }
    render(){
        return(
            <div>
                <Alert color="info" isOpen="true">
                    <div class="d-flex justify-content-center ">
                        <Button className="btn-large bg-primary m-2" type="button" onClick={this.onCreateUserClick}  > CREATE A NEW USER</Button>
                        <InfoModal  trigger={this.state.createUser} title="Create a new user" toggle={this.onCreateUserClick}>
                            <CreateUserForm></CreateUserForm>
                        </InfoModal>
                        <Button className="btn-large m-2" type="button" > DELETE USER</Button>
                    </div>
                </Alert>
               <UsersTable></UsersTable>
            </div>
            
        )
    }   
} 

export default Users;