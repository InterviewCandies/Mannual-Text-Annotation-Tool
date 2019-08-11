import React, { Component} from 'react';
import axios from 'axios';
import {
  Alert,
  Col,
  Row,
  Card,
  CardBody,
  Button
} from 'reactstrap';
import jwt_decode  from 'jwt-decode';
import AdminProjectCard from '../../component/Card/AdminProjectCard';
import SearchBar from '../../component/Searchbar/SearchBar';
import InfoModal from '../../component/Modal/Info.modal'
import CreateProjectForm from '../../component/Form/CreateProjectForm'
import { list } from '../../functions/project.function';
import ProjectTable from '../../component/Table/Project/ProjectTable';




class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        visible: true,
        createProject: false
      };
    
      this.onDismiss = this.onDismiss.bind(this);
  }

  
  
 
  
 
  onClick=async(e)=>{
     this.setState({
       createProject : !this.state.createProject,
     })

  }

  onDismiss() {
    this.setState({ visible: false });
  }

  
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>


  render() {

    return (
      <div className="animated fadeIn">
       
       <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
              <div class="d-flex justify-content-center ">
                  <Button className="btn-large bg-primary m-2" type="button" onClick={this.onClick}  > CREATE A NEW PROJECT</Button>
                  <InfoModal  trigger={this.state.createProject} title='Create project' toggle={this.onClick} >
                    <CreateProjectForm action ={this.onChangeProject}> </CreateProjectForm>
                   
                  </InfoModal>
                  <Button className="btn-large m-2" type="button" > GO TO STATISTIC</Button>
              </div>
        </Alert>
       
     
          <ProjectTable></ProjectTable>
         
       
        
       
    
    
      </div>
    );
  }
}

export default AdminDashboard;
