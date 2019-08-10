import React, { Component} from 'react';
import faker from 'faker'
import jwt_decode from 'jwt-decode'
import {
  Alert,
  
} from 'reactstrap';
import {getProject} from '../../functions/project.function'
import UserProjectCard from '../../component/Card/UserProjectCard';




class UserDashboard extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('userToken')
    const decoder = jwt_decode(token);
    this.username = decoder.username;
    this.id = decoder.id;
    this.state = {
        visible: true,
        projects: []
      };
    
      this.onDismiss = this.onDismiss.bind(this);
  }
  
  async componentDidMount(){
          this.setState({
            projects : await getProject(this.id)
          })
  }

  onDismiss() {
    this.setState({ visible: false });
  }
 

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  displayProject(){
       return (
             this.state.projects.map((project,i)=>{
                    return <UserProjectCard project={project} key={i} ></UserProjectCard> 
             })
       )
  }
  render() {

    return (
      <div className="animated fadeIn">
      
       <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
              {`Hi  ${this.username} ! Welcome to text annotation.  Hope you have a nice day`}
        </Alert>

       {this.displayProject()}

      </div>
    );
  }
}

export default UserDashboard;
