import React,{Component} from 'react'
import { Link} from 'react-router-dom'
import {
    ButtonGroup,
    Button
} from 'reactstrap'

import EditProjectModal from '../../Modal/EditProjectModal';
import DeleteProjectModal from '../../Modal/DeleteProjectModal';
import AddUserModal from '../../Modal/AddUserModal';
import RemoveUserModal from '../../Modal/RemoveUserModal';
class ProjectData extends Component{
    constructor(props){
            super(props)
            this.state={
                users : this.props.users,
                editProject : false,
                deleteProject:false,
                addUser : false,
                removeUser: false,
            }
    }
   
    //Listen to changes
   componentDidUpdate(oldProps){
        const props = this.props
            if(oldProps.data != props.data )
            this.setState({
                users : props.users,
            })
     
    }

    // Actions 
    onDisplayUser(){
        if(this.state.users.length === 0) return <p> (No user) </p>
        return this.state.users.map((user,i)=><p style={{display:'inline'}}>{i != 0 ? ',' : ''}{ user.username }</p>)
    }   
    onEditProject = () => {
        this.setState(prevState => ({
            editProject : !prevState.editProject
        }));
    }
    onDeleteProject = () => {
        this.setState(prevState => ({
            deleteProject : !prevState.deleteProject
        }));
    }
    onAddUser = () => { 
        this.setState(prevState => ({
            addUser : !prevState.addUser
        }));
    }
    onRemoveUser = () => {
        this.setState(prevState => ({
            removeUser: !prevState.removeUser
        }));
    }
    
    render(){
        return(
            <tr>
                <td><Link to={`/project/${this.props.data.id}/import`} >{this.props.data.project_name}</Link></td>
                <td>{  this.props.data.project_description }</td>
                <td>{  this.onDisplayUser() }</td>
                <td>{  this.props.data.created_at }</td>
                <td>{  this.props.data.updated_at }</td>
                <td >
                    <ButtonGroup>
                        <Button onClick={this.onAddUser} color="warning">
                            <i className="fa fa-user-plus" ></i>
                            <AddUserModal   trigger={this.state.addUser}
                                            toggle={this.onAddUser}
                                            data={this.props.data}
                                            action={this.props.action}>

                            </AddUserModal>
                        </Button>
                        <Button onClick={this.onRemoveUser} color="secondary">
                            <i className="fa fa-user-times"></i>
                            <RemoveUserModal trigger={this.state.removeUser}
                                            toggle={this.onRemoveUser}
                                            data={this.props.data}
                                            action={this.props.action}
                                            users={this.state.users}></RemoveUserModal>
                        </Button>
                       
                        <Button onClick={this.onEditProject} color="primary">
                            <i className="fa fa-edit"></i>
                            <EditProjectModal trigger={this.state.editProject} 
                                               toggle={this.onEditProject}
                                               data={this.props.data}
                                               action={this.props.action}>                        
                            </EditProjectModal>
                        </Button>
                        <Button onClick={this.onDeleteProject} color="danger">
                            <i className="fa fa-trash"></i>
                            <DeleteProjectModal  trigger={this.state.deleteProject}
                                                 toggle={this.onDeleteProject}
                                                 data={this.props.data}
                                                 action={this.props.action}>
                            </DeleteProjectModal>
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
        )
    }
}
export default ProjectData