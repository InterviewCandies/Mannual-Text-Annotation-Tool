import React, { Component} from 'react';
import faker from 'faker'
import jwt_decode from 'jwt-decode'
import {
  Alert,
  
} from 'reactstrap';




class UserDashboard extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('userToken')
    const decoder = jwt_decode(token);
    this.username = decoder.username;
    this.state = {
        visible: true,
      };
    
      this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }


  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
      
       <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
              {`Hi  ${this.username} ! Welcome to text annotation.  Hope you have a nice day`}
        </Alert>
           

    
      </div>
    );
  }
}

export default UserDashboard;
