import React, { Component, lazy, Suspense } from 'react';
import dateFormat from '../../service/dateFormat'
import axios from 'axios'
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
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,

} from 'reactstrap';



class AdminProjectCard extends Component{
   
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
    
        this.state = {
          dropdownOpen: false,
        };



      }
      
    toggle() {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen,
      });
    }

    onEditProject=()=>{
          
    }

    onDeleteProject=()=>{

    }

    render(){
        return(
            <Card style={{width:'350px'}}>
              <CardHeader>
                <ButtonGroup className="float-right">
                    <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                        <DropdownToggle caret className="p-0" color="black">
                        <i className="icon-settings"></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                        <DropdownItem>Add new label</DropdownItem>
                        <DropdownItem>Delete label</DropdownItem>
                        <DropdownItem>Add new user</DropdownItem>
                        <DropdownItem>Delete user</DropdownItem>
                        <DropdownItem>Import dataset</DropdownItem>
                        <DropdownItem>Export dataset</DropdownItem>
                        <DropdownItem onClick={this.onEditProject}>Edit project</DropdownItem>
                        <DropdownItem onClick={this.onDeleteProject}>Delete project</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                    </ButtonGroup>
                <div className="text-value">{this.props.project.project_name}</div>
              </CardHeader>
              <CardBody className="pb-0" style={{height:'300px',overflowY:'auto'}}>
                                <div><p><b>Des: </b>{this.props.project.project_description}</p></div>
                <div><p><b>Users: </b> {this.props.project.project_description} </p></div>
                <div><p><b>Update: </b>{dateFormat( this.props.project.updated_at )}</p></div>
                <div>
                    <p><b>Label:</b></p>
                    <Button className="btn-sm btn-pill " style={{margin:'5px'}} > {faker.name.findName()}</Button>
                    <Button className="btn-sm btn-pill" style={{margin:'5px'}} > {faker.name.findName()}</Button>
                    <Button className="btn-sm btn-pill" style={{margin:'5px'}} > {faker.name.findName()}</Button>
                </div>
              

                
              </CardBody>
              <CardFooter>
                   <Progress value="25"></Progress>
              </CardFooter>
              
            </Card>
        );
    }
}
export default AdminProjectCard;