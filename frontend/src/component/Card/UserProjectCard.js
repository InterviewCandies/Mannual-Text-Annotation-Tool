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

class UserProjectCard extends Component{
    render(){
        return(
                
        <Row>
        <Col>
          <Card>
            <CardHeader >
                <h2 style={{color:'#20a8d8'}}>{faker.lorem.words()}</h2>
            </CardHeader>
            <CardBody>
                <h5>Description:</h5>
                <p>{faker.lorem.paragraph()}</p>
                <h5>Users:</h5>
                <p>{faker.lorem.words()}</p>
                <h5>Label:</h5>
                <div>
                    <Button style={{backgroundColor:'white',margin:'5px'}}>Hello</Button>
                    <Button style={{backgroundColor:'white'}}>Hello</Button>
                    <Button style={{backgroundColor:'white',margin:'5px'}}>Hello</Button>
                    <Button style={{backgroundColor:'white'}}>Hello</Button>
                </div>
                <a href="#/document/:id" className="float-right">Go to document</a>
            </CardBody>
            
          </Card>
        </Col>
      </Row>
        );
    }   
}

export default UserProjectCard;