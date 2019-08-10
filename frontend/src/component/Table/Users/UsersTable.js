import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import dateformat from '../../../service/dateFormat'
import { UserList } from '../../../functions/user.function';

function UserRow(props) {
  const user = props.user

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }
  const getRole = (role) =>{
      return role == 0 ? "user" : "admin" 
  }

  return (
    <tr >
      <td >{user.id}</td>
      <th scope="row">{user.username}</th>
      <td>{dateformat(user.created_at)}</td>
      <td>{getRole(user.role)}</td>
      <td><Badge color={getBadge(user.status)}>{user.status}</Badge></td>
    </tr>
  )
}

class UsersTable extends Component {
  constructor(props){
    super(props)
    this.state={
      userList : []
    }
  }
  async componentDidMount(){
      const result =await  UserList();
      this.setState({
        userList: result
      })
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col >
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users 
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Created at</th>
                      <th scope="col">Role</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.userList.map((user, index) =>
                      <UserRow key={index} user={user}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default UsersTable;
