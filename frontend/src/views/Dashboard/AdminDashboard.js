import React, { Component,Suspense} from 'react';
import ProjectTable from '../../component/Table/Project/ProjectTable';

class AdminDashboard extends Component {
 
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  render() {
    return (       
      <ProjectTable ></ProjectTable> 
    );
  }
}

export default AdminDashboard;
