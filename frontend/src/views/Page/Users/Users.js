import React,{Component} from 'react'
import UsersTable from '../../../component/Table/Users/UsersTable';
class Users extends Component{
    constructor(props){
        super(props)
        
    }
    
    render(){
        return(
            <div>
               
               <UsersTable></UsersTable>
            </div>
            
        )
    }   
} 

export default Users;