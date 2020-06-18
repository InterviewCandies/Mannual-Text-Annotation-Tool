import React,{Component} from 'react'
import {
    Card,
    CardBody
} from 'reactstrap'
import { userProjectList } from '../../../functions/project.function';
import UserProjectData from './UserProjectData'
import CustomPagination from '../../Pagination/CustomPagination';
import Spinner from '../../Spinner/Spinner';
class UserProjectTable extends Component {
    constructor(props){
        super(props)
        this.state ={
            filteredProjects: [],
            query:'',
            size:0,
            sortKey:'project_name',
            trend:1,
            searchKey:'',
            editProject:false,
            projectsPerPage : 10,
            currentPage : 1,
            loading : false
        }
    }
   
    async componentDidMount(){
        const { currentPage,projectsPerPage,sortKey,trend,searchKey } = this.state
        let result = await userProjectList(this.props.userId,currentPage,projectsPerPage,sortKey,trend,searchKey)
        let { projects,size } = result
       
        this.setState({
            filteredProjects :projects,
            size : size?size:0,
            loading : true
        })
        
    }
    async onChange() {
        const { currentPage,projectsPerPage,sortKey,trend,searchKey } = this.state;
        let result = await userProjectList(this.props.userId,currentPage,projectsPerPage,sortKey,trend,searchKey);
        let { projects,size } = result;
       this.setState({
            size : size ? size : 0
        });
        this.setState({
            filteredProjects : projects
        });
    }
    onDropDownChange = async(e) => {
        await this.setState({
            projectsPerPage : Number(e.target.value),
            currentPage : 1
        })
        this.onChange();
    }
    
    onSearchChange = async(e) => {
        const query = e.target.value;
        this.setState({
            searchKey : query,
            currentPage : 1
        });
        this.onChange();
    }
   
    onPaginationClick = async(e) => {
        await this.setState({
            currentPage : e
        });
        this.onChange();
    }

    displayProjects = (currentsProjects) => {
            currentsProjects = currentsProjects || [];
            return currentsProjects.map((project,i) => {
            return <UserProjectData data={project} key={i} users={project.users} ></UserProjectData>
        });
    }
    render(){
        //for Pagination
        const {size,filteredProjects,projectsPerPage,currentPage} = this.state;
        const pageNumbers = []
        for(let i=1; i<=Math.ceil(size/projectsPerPage); i++)
            pageNumbers.push(i);

        //for display Project
         //Show project based on pagination
        const indexOfLastProject = currentPage*projectsPerPage;
        const indexOfFirstProject = indexOfLastProject-projectsPerPage;
        let currentsProjects = filteredProjects;

        return(
            <div>{(this.state.loading)? <Card>
                <CardBody>
                <div className="d-flex flex-row justify-content-between">
                  <div className=" form-group form-inline">
                         <label  className="mr-sm-2">Show </label>
                         <select class="custom-select mr-sm-2" id="dropdown" onChange={this.onDropDownChange} >
                            <option value="10" selected>10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <label>entries</label>
                     
                  </div>
                  <div className="form-group form-inline">
                      <input className="form-control mr-sm-2" 
                             type="text" 
                             onChange={this.onSearchChange}
                             placeholder="Search project"></input>
                  </div>
                </div>
                <table className="table table-striped table-bordered text-center">
                    <thead>
                        <tr>
                            <th scope="col">
                                Name
                            </th>
                            <th scope="col">
                                Description
                            </th>
                            <th scope="col">User</th>
                            <th scope="col">
                                Created at
                            </th>
                            <th scope="col">
                                Updated at
                            </th>
                            <th scope="col">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.displayProjects(currentsProjects)}
                    </tbody>
                </table>

               
               <div className="d-flex flex-row justify-content-between">
                    <p >
                      {`Show ${Math.min(indexOfFirstProject+1,size) } to ${Math.min(indexOfLastProject,size)} of ${size} entries`}
                    </p>
                    <CustomPagination pages={pageNumbers.length} 
                                      currentPage={currentPage} 
                                      onClick={this.onPaginationClick}>
                    </CustomPagination>
               </div> 

               </CardBody>
                
            </Card>:  <Spinner content='projects'></Spinner>}
          </div>
            
        )
    }
}

export default UserProjectTable;