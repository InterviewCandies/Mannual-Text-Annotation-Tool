import React,{Component} from 'react'
import {
   Button,
   ButtonGroup
} from 'reactstrap'
import DeleteUserModal from '../../Modal/DeleteUserModal';
import EditUserModal from '../../Modal/EditUserModal';

class UserData extends Component{
    constructor(props){
         super(props)
         this.state={
             user : this.props.user,
             edit :false,
             delete : false
         }
    }
    componentDidUpdate(oldProps){
        const props = this.props
            if(oldProps.user != props.user )
            this.setState({
                user : props.user
            })
     
    }
  
    onEdit = () => {
        this.setState(prevState => ({
             edit : !prevState.edit
        }));
    }
    onDelete = () => {
        this.setState(prevState => ({
              delete : !prevState.delete
        }))
    }
    render(){
        const { username,role,created_at,updated_at } = this.state.user;
        return (
           <tr>
               <td>{username}</td>
               <td>{role?'admin':'user'}</td>
               <td>{created_at}</td>
               <td>{updated_at}</td>
               <td>
                   <ButtonGroup>
                       <Button color="primary" onClick={this.onEdit}>
                            <i className="fa fa-edit"></i>
                        </Button>
                        <EditUserModal trigger={this.state.edit}
                                         toggle ={this.onEdit}
                                         data ={this.props.user}
                                         action={this.props.action}>

                        </EditUserModal>
                       <Button color="danger" onClick={this.onDelete}>
                           <i className="fa fa-trash"></i>
                        </Button>
                        <DeleteUserModal trigger={this.state.delete}
                                         toggle ={this.onDelete}
                                         data ={this.props.user}
                                         action={this.props.action}>
                        </DeleteUserModal>
                   </ButtonGroup>
               </td>
           </tr>
        )
    }
}
export default UserData