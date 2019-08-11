import React,{Component} from 'react'
import {
    Button
} from 'reactstrap'
import { removeUser, listUser } from '../../functions/project.function';
class RemoveUserForm extends Component{
    constructor(props){
        super(props);
        this.state={
            users : this.props.users
        }
    }
    async onClick(user,index){
        const result = await removeUser(user.id,this.props.project.id);
        
         let array = [...this.state.users]
         array.splice(index,1)
         this.setState({
             users : array
         })
       
         
    }
   
    displayUser(){
        
        if(!this.state.users.length) return <p className="d-flex justify-content-center">(No user to remove)</p>
        return this.state.users.map((user,index)=>{ 
            return( <div className="d-flex  justify-content-between p-2 border-bottom">
                    <h6>{user.username}</h6>
                    <Button className="btn bg-red btn-sm" onClick={this.onClick.bind(this,user,index)}><i className="fa fa-times"></i></Button>
                    </div>
            )
         })
     }
    render(){
        return(
            <div>
                {this.displayUser()}
               <Button color="secondary"  className="float-right m-2" onClick={this.props.toggle}>Cancel</Button> 
            </div>

        )
    }
}
export default RemoveUserForm