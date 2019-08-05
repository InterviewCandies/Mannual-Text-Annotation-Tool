import React, { Component} from 'react';
import axios from 'axios';
import {
  Alert,
  Col,
  Row,
} from 'reactstrap';
import jwt_decode  from 'jwt-decode';
import AdminProjectCard from '../../component/Card/AdminProjectCard';




class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('userToken');
    const decoder = jwt_decode(token);
    this.username = decoder.username;
    this.state = {
        visible: true,
        projectList: []
      };
    
      this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount(){
       axios.get('http://localhost:4000/textAnnotation/project/list')
            .then((res)=>{
                console.log(res.data);
                this.setState({
                    projectList:res.data
                })
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
              {`Hi ${this.username} !  Welcome to text annotation.  Hope you have a nice day`}
        </Alert>
           
        <Row>

             <Col xs="12" sm="6" lg="4">
                    {this.state.projectList.map((project, index) =>
                        <AdminProjectCard key={index} project={project}/>
                    )}
             </Col>
             
        </Row>
        
       
    
    
      </div>
    );
  }
}

export default AdminDashboard;
