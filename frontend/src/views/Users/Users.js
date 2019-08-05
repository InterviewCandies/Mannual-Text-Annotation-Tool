import React,{Component} from 'react'
import UsersTable from '../../component/Table/Users/UsersTable';
import {createUser} from '../../functions/user.function'
class Users extends Component{
    constructor(props){
        super(props)
        this.onCreateUserClick= this.onCreateUserClick.bind(this)
    }
    async onCreateUserClick(e){
         const newUser ={
             username: "admin1",
             password: "12345",
             role: 1,
             jwt : localStorage.getItem('useroken')
         }
         const result =  await createUser(newUser);
         console.log(result);
    }
    render(){
        return(
            <div>
              
                <button class="btn btn-square btn-primary" onClick={this.onCreateUserClick}>Create new user</button>
               <UsersTable></UsersTable>
            </div>
            
        )
    }   
} 

export default Users;