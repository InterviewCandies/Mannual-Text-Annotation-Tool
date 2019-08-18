import React, { Component} from 'react';
import jwt_decode from 'jwt-decode'
import UserProjectTable from '../../component/Table/UserProject/UserProjectTable';




class UserDashboard extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('userToken')
    const decoder = jwt_decode(token);
    this.username = decoder.username;
    this.id = decoder.id;
    
  }
  
  
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  
  render() {

    return (
      <div className="animated fadeIn">
      
       <UserProjectTable userId={this.id} ></UserProjectTable>

      </div>
    );
  }
}

export default UserDashboard;
