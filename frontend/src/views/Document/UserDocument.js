import React, { Component, lazy, Suspense } from 'react';
import faker from 'faker'
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Progress,
  Row,
} from 'reactstrap';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import { AppHeader } from '@coreui/react';




class UserDocument extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
       <br></br>
       <Progress value="25"><strong>1/6</strong></Progress> 
       <br></br>

        <Row >
          <Col>
            <Card>
              <CardHeader style={{background:'#2f353a'}}>
                  <ButtonGroup>
                      <Button className="btn-lg" style={{backgroundColor:'white',margin:'10px'}}>Hello</Button>
                      <Button className="btn-lg" style={{backgroundColor:'white',margin:'10px'}}>Hello</Button>
                      <Button className="btn-lg" style={{backgroundColor:'white',margin:'10px'}}>Hello</Button>
                      <Button className="btn-lg" style={{backgroundColor:'white',margin:'10px'}}>Hello</Button>
                  </ButtonGroup>
              </CardHeader>
              <CardBody>
                 <ButtonGroup>
                        <Button style={{backgroundColor:'white'}}>Hello</Button>
                        <Button style={{backgroundColor:'white'}}>Hello</Button>
                        <Button style={{backgroundColor:'white'}}>Hello</Button>
                        <Button style={{backgroundColor:'white'}}>Hello</Button>
                  </ButtonGroup>
                  <hr></hr>
                  <h4>{faker.lorem.paragraphs()}</h4>
                  
               
              </CardBody>
              
            </Card>
            
          </Col>
        </Row>
        <Button className="btn-lg"  color='primary'><i className="fa fa-arrow-left"></i> Prev</Button>
        <Button className="float-right btn-lg"  color='primary'> Next <i className="fa fa-arrow-right"></i></Button>


      
    
      </div>
    );
  }
}

export default UserDocument;
