import React, { Component, lazy, Suspense } from 'react';
import dateFormat from '../../service/dateFormat'
import faker from 'faker'
import {
  
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Dropdown,
  Progress,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,

} from 'reactstrap';
import EditProjectForm from "../Form/EditProjectForm"
import InfoModal from '../Modal/Info.modal';
import DangerModal from '../Modal/danger.modal';
import AddUserForm from '../Form/AddUserForm';
import { listUser } from '../../functions/project.function';
import RemoveUserForm from '../Form/RemoveUserForm';



class AdminProjectCard extends Component{
   
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          project : this.props.project,
          dropdownOpen: false,
          addUser : false,
          editProject : false,
          deleteProject: false,
          removeUser : false,
          users : []
        };

      }
    
      
    async componentDidMount(){
          this.setState({
            users : await listUser(this.state.project.id)
          })
          
    }
    async componentDidUpdate(){
          this.setState({
            users : await listUser(this.state.project.id)
          })
    }
    toggle() {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen,
      });
    }

    onEditProject=()=>{
    
      this.setState({
        editProject: !this.state.editProject
     })
    
     
    }
    onAddUser=()=>{
       this.setState({
         addUser : !this.state.addUser
       })
    }
    onRemoveUser=()=>{
      this.setState({
        removeUser : !this.state.removeUser
      })
    }
    onDeleteProject=()=>{
      this.setState({
            deleteProject : !this.state.deleteProject
      })
    }
    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.project !== prevState.project) {
        return {
          project: nextProps.project
        };
      }
      
      return null;
      }
    displayUser=(e)=>{
      if(!this.state.users.length) return '(none)'
      return this.state.users.map((user,index)=>{
      let comma = (index!=0)?',':'';
      if(user.role==1) return( <h6 className="text-danger d-inline"> { comma + user.username}</h6>)
             else return (<h6 className="text-primary d-inline"> { comma + user.username}</h6>)
          }
      )
    }

    render(){
        return(
            <Card style={{width:'350px'}}>  
              <CardHeader>
                <ButtonGroup className="float-right">
                    <ButtonDropdown id={this.state.project.id} isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                        <DropdownToggle caret className="p-0" color="black">
                        <i className="icon-settings"></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                        <DropdownItem>Add new label</DropdownItem>
                        <DropdownItem>Delete label</DropdownItem>
                        
                        <DropdownItem onClick={this.onAddUser}><i className="fa fa-user-plus text-dark"></i>Add new user</DropdownItem>
                        <InfoModal trigger={this.state.addUser} title='Add new user' toggle={this.onAddUser}> 
                         <AddUserForm project={this.state.project}></AddUserForm>
                        </InfoModal>

                        <DropdownItem onClick={this.onRemoveUser}><i className="fa fa-user-times text-dark"></i>Remove user</DropdownItem>
                        <InfoModal trigger={this.state.removeUser} title='Remove user' toggle={this.onRemoveUser}> 
                        <RemoveUserForm project={this.state.project} users={this.state.users}></RemoveUserForm>
                        </InfoModal>

                        <DropdownItem>Import dataset</DropdownItem>
                        <DropdownItem>Export dataset</DropdownItem>
                        
                         
                        <DropdownItem onClick={this.onEditProject}><i className="fa fa-edit text-dark"></i> Edit project</DropdownItem>
                        <InfoModal  trigger={this.state.editProject} title='Edit project' toggle={this.onEditProject} >
                          <EditProjectForm project={this.state.project} action={this.props.action} ></EditProjectForm>
                        </InfoModal>


                        <DropdownItem onClick={this.onDeleteProject}><i className="fa fa-trash text-dark"></i> Delete project</DropdownItem>
                          <DangerModal trigger={this.state.deleteProject} 
                                       title="Delete project"  
                                       subject ="PROJECT" 
                                       id={this.state.project.id} 
                                       toggle={this.onDeleteProject}
                                       action={this.props.action}>
                        </DangerModal>

                        </DropdownMenu>
                    </ButtonDropdown>
                    </ButtonGroup>
                <div className="text-value">{this.state.project.project_name}</div>
              </CardHeader>
              <CardBody className="pb-0" style={{height:'300px',overflowY:'auto'}}>
                                <div><p><b>Des: </b>{this.state.project.project_description}</p></div>
                <div><p><b>Users: </b> {this.displayUser()} </p></div>
                <div><p><b>Update: </b>{dateFormat( this.state.project.updated_at )}</p></div>
           
                <Progress value="25"></Progress>
                
              </CardBody>
              
            </Card>
        );
    }
}
export default AdminProjectCard;