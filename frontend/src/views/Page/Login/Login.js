import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { login } from '../../../functions/user.function'
class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      username: '',
      password:'',
    }
  }
  onChangeUsername(e){
       this.setState({
         username: e.target.value
       })
  }
  onChangePassword(e){
      this.setState({
        password:e.target.value
      })
  }
  
  async onSubmit(e){
    e.preventDefault();
    const newLogin = {
        username: this.state.username,
        password: this.state.password
    }
    const result = await login(newLogin);
    if(result.username){   
          this.props.history.push('/');
    }
    else {
      document.getElementById('error').style.display='block';
      this.setState({
        username:'',
        password:''
      })
    }
        
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={(e) => this.onSubmit(e)}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"
                               placeholder="Username" 
                               autoComplete="username" 
                               value={this.state.username}
                               onChange={(e) => this.onChangeUsername(e)}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" 
                        placeholder="Password" 
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={(e) => this.onChangePassword(e)}/>
                      </InputGroup>
                      <p  id="error" style={{color:'red',display:'none'}}>
                        Invalid username or password
                      </p>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" >Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
