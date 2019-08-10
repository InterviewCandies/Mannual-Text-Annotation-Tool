import React, { Component, lazy, Suspense } from 'react';
import faker from 'faker'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import {listUser} from '../../functions/project.function'
class UserProjectCard extends Component{
    constructor(props){
      super(props);
      this.state ={
        users : []
      }
    }
    async componentDidMount(){
      this.setState({
        users : await listUser(this.props.project.id)
      })
      
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
                
        <Row>
        <Col>
          <Card>
            <CardHeader >
                <h2 className="text-primary">{this.props.project.project_name}</h2>
            </CardHeader>
            <CardBody>
                <h5>Description:</h5>
                <p>{this.props.project.project_description}</p>
                <h5>Users:</h5>
                <p>{this.displayUser()}</p>
                <h5>Label:</h5>
               
                <a href="#/document/:id" className="float-right">Go to document</a>
            </CardBody>
            
          </Card>
        </Col>
      </Row>
        );
    }   
}

export default UserProjectCard;