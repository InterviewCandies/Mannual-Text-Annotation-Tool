import React, { Component } from 'react';
import { Card, CardBody, Button} from 'reactstrap';
import { userList } from '../../../functions/user.function';
import CustomPagination from '../../Pagination/CustomPagination';
import UserData from './UserData';
import CreateUserModal from '../../Modal/CreateUserModal';
import Spinner from '../../Spinner/Spinner';


class UsersTable extends Component {
  constructor(props){
    super(props)
    this.state={
       users:[],
       size:0,
       currentPage : 1,
       usersPerPage: 10,
       sortKey : "username",
       searchKey : '',
       createUser : false,
       trend: 1,
       loading : true
    }
  }
  async componentDidMount(){
      const {currentPage,usersPerPage,sortKey,trend,searchKey}= this.state
      const result =await  userList(currentPage,usersPerPage,sortKey,trend,searchKey)
      if(result.size)
        this.setState({
          users: result.users,
          size  : result.size,
        })
      this.setState({
           loading : false
      })
  }
  onChange =async (e) =>{
    const {currentPage,usersPerPage,sortKey,trend,searchKey}= this.state
    const result =await  userList(currentPage,usersPerPage,sortKey,trend,searchKey)
    this.setState({
      users: result.users,
      size  : result.size
    })
  }
  onCreateUser = async (e) =>{
    this.setState({
       createUser : !this.state.createUser
    })
  }
  onDropDownChange = async(e)=>{
    await this.setState({
        usersPerPage : Number(e.target.value),
        currentPage : 1
    })
    await this.onChange(e)
   }
  onPaginationClick =async (e)=>{
    await this.setState({
        currentPage : e
    })
    await this.onChange(e)
  }
  onSearchChange=async (e)=>{
    const query = e.target.value
    await this.setState({
         searchKey : query,
         currentPage: 1
    })
    await this.onChange()
  }
  onSort=async (sortKey,value)=>{
    await this.setState({
          trend : value,
          sortKey:sortKey  
    })
   this.onChange()
   }
  displayUser() {
      let {users} = this.state
      users = users || []
      return users.map((user)=><UserData user={user} action={this.onChange}></UserData>)
  }

  render() {
    const {currentPage,usersPerPage,size} =this.state
    const pageNumbers = []
    for(let i=1;i<=Math.ceil(size/usersPerPage);i++)
        pageNumbers.push(i);

    //for display Project
     //Show project based on pagination
     const indexOfLastUser = currentPage*usersPerPage
     const indexOfFirstUser =indexOfLastUser-usersPerPage
    return (
      <div className="animated fadeIn">
            {(!this.state.loading)?
            <Card>
              <CardBody>
              <div className="d-flex flex-row justify-content-between my-sm-2">
                        <div className=" form-group form-inline">
                            <label  className="mr-sm-2">Show </label>
                            <select class="custom-select mr-sm-2" id="dropdown" onChange={this.onDropDownChange} >
                                <option value="10" selected>10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <label>entries</label>
                            <Button className="btn-success ml-sm-3" onClick={this.onCreateUser}>Create a new user</Button>
                            <CreateUserModal trigger={this.state.createUser}
                                             toggle={this.onCreateUser}
                                             action={this.onChange}>
                            </CreateUserModal>
                        </div>
                        
                        <div className="form-group form-inline">
                            <label className="mr-sm-2">Search:</label>
                            <input className="form-control mr-sm-2" type="text" onChange={this.onSearchChange}></input>
                        </div>
                    </div>
                  <table className="table table-striped table-bordered text-center">
                  <thead>
                    <tr>
                   
                      <th scope="col">Username
                        <div className="float-right" >
                          <i className="fa fa-arrow-up mb-sm-0 p-sm-0" onClick={this.onSort.bind(this,"username",1)}></i>
                          <i className="fa fa-arrow-down mt-sm-0 p-sm-0" onClick={this.onSort.bind(this,"username",-1)}></i>
                        </div>
                      </th>
                      <th scope="col">Role
                        <div className="float-right" >
                          <i className="fa fa-arrow-up mb-sm-0 p-sm-0" onClick={this.onSort.bind(this,"role",1)}></i>
                          <i className="fa fa-arrow-down mt-sm-0 p-sm-0" onClick={this.onSort.bind(this,"role",-1)}></i>
                        </div>
                      </th>
                      <th scope="col">Created at
                        <div className="float-right" >
                          <i className="fa fa-arrow-up mb-sm-0 p-sm-0" onClick={this.onSort.bind(this,"created_at",1)}></i>
                          <i className="fa fa-arrow-down mt-sm-0 p-sm-0" onClick={this.onSort.bind(this,"created_at",-1)}></i>
                        </div>
                      </th>
                      <th scope="col">Updated at
                        <div className="float-right" >
                          <i className="fa fa-arrow-up mb-sm-0 p-sm-0" onClick={this.onSort.bind(this,"updated_at",1)}></i>
                          <i className="fa fa-arrow-down mt-sm-0 p-sm-0" onClick={this.onSort.bind(this,"updated_at",-1)}></i>
                        </div>
                      </th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.displayUser()}
                  </tbody>
                </table>
                  
                <div className="d-flex flex-row justify-content-between">
                        <p >
                            {`Show ${Math.min(indexOfFirstUser+1,size) } to ${Math.min(indexOfLastUser,size)} of ${size} entries`}
                        </p>
                        <CustomPagination  pages={pageNumbers.length}
                                            currentPage={currentPage}
                                            onClick={this.onPaginationClick}></CustomPagination>
                    </div> 
              </CardBody>
            </Card> : <Spinner content="users"></Spinner>}
         
      </div>
    )
  }
}

export default UsersTable;
