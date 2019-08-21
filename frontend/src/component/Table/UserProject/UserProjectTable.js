import React,{Component} from 'react'
import dateFormat from '../../../utils/dateFormat'
import {
    ButtonGroup,
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    Card,
    CardBody
} from 'reactstrap'
import { list, listUser, getProjectByUser, userSearchProject } from '../../../functions/project.function';
import { throwStatement } from '@babel/types';
import UserProjectData from './UserProjectData'
import { listLabel } from '../../../functions/label.function';
import { async } from 'q';
import CustomPagination from '../../Pagination/CustomPagination';
class UserProjectTable extends Component {
    constructor(props){
        super(props)
        this.state ={
           
            filteredProjects: [],
            query:'',
            size:0,
            editProject:false,
            projectsPerPage : 10,
            currentPage : 1,
        }
    }
    async getUser(projects){
        if(!projects)  return projects;
        return Promise.all(projects.map(async (project)=>{project.users = await listUser(project.id); return project}))
     }
    
    async componentDidMount(){
        const {currentPage,projectsPerPage} = this.state
        let projects = await getProjectByUser(this.props.userId,currentPage,projectsPerPage)
        this.setState({
            size : projects.size?projects.size:0
        })
        projects =await this.getUser(projects.projects)
        this.setState({
            filteredProjects :projects,
            
        })
        
    }
    async  onChange(){
        const {currentPage,projectsPerPage} = this.state
       
        let projects = await getProjectByUser(this.props.userId,currentPage,projectsPerPage)
        this.setState({
            size : projects.size
        })
        projects =await this.getUser(projects.projects)
        this.setState({
            filteredProjects :projects,
           
        })
        
    }
    onDropDownChange = async(e)=>{
        await this.setState({
            projectsPerPage : Number(e.target.value)
        })
        this.onChange(e)
    }
    
  
    onAscendingSort=(e,sortKey)=>{
            const filteredProjects = this.state.filteredProjects
            filteredProjects.sort((a,b)=>a[sortKey].localeCompare(b[sortKey]))
            this.setState({filteredProjects})
    }
    onDescendingSort=(e,sortKey)=>{
        const filteredProjects = this.state.filteredProjects
        filteredProjects.sort((a,b)=>b[sortKey].localeCompare(a[sortKey]))
        this.setState({filteredProjects})
    }
    onSearchChange=async(e)=>{
        const query = e.target.value
        const {projectsPerPage} =this.state
        let result={}
        if(query) result = await userSearchProject(this.props.userId,1,projectsPerPage,query)
        else result = await getProjectByUser(this.props.userId,1,projectsPerPage)
        const projects =await this.getUser(result.projects)
         this.setState({
            filteredProjects : projects,
            size :  result.size
        })
    }
   
    onPaginationClick =async (e)=>{
        await this.setState({
            currentPage : e
        })
        await this.onChange(e)
    }

    displayProjects =  (currentsProjects)=>{
            return currentsProjects.map(  (project,i)=>{
            return  <UserProjectData data={project} key={i} users={project.users} ></UserProjectData>
        })
         
       
    }
    render(){
        //for Pagination
        const {size,filteredProjects,projectsPerPage,currentPage} = this.state
        const pageNumbers = []
        for(let i=1;i<=Math.ceil(size/projectsPerPage);i++)
            pageNumbers.push(i);

        //for display Project
         //Show project based on pagination
         const indexOfLastProject = currentPage*projectsPerPage
         const indexOfFirstProject =indexOfLastProject-projectsPerPage
         const currentsProjects = filteredProjects
        return(

            <Card>
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
                      <label className="mr-sm-2">Search:</label>
                      <input className="form-control mr-sm-2" type="text" onChange={this.onSearchChange}></input>
                  </div>
                </div>
                <table className="table table-striped table-bordered">
                    <thead>
                        <th scope="col">
                            Name
                            <div className="float-right">
                                <i className="fa fa-arrow-up" onClick={e=>this.onAscendingSort(e,"project_name")}></i>
                                <i className="fa fa-arrow-down" onClick={e=>this.onDescendingSort(e,"project_name")} ></i>
                            </div>
                        </th>
                        <th scope="col">
                            Description
                            <div className="float-right">
                                <i className="fa fa-arrow-up" onClick={e=>this.onAscendingSort(e,"project_description")}></i>
                                <i className="fa fa-arrow-down" onClick={e=>this.onDescendingSort(e,"project_description")} ></i>
                            </div>
                        </th>
                        <th scope="col">User</th>
                        <th scope="col">
                            Created at
                            <div className="float-right">
                                <i className="fa fa-arrow-up" onClick={e=>this.onAscendingSort(e,"created_at")}></i>
                                <i className="fa fa-arrow-down" onClick={e=>this.onDescendingSort(e,"created_at")} ></i>
                            </div>
                        </th>
                        <th scope="col">
                            Updated at
                            <div className="float-right">
                                <i className="fa fa-arrow-up" onClick={e=>this.onAscendingSort(e,"updated_at")}></i>
                                <i className="fa fa-arrow-down" onClick={e=>this.onDescendingSort(e,"updated_at")} ></i>
                            </div>
                        </th>
                        <th scope="col">Actions</th>
                        
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
                
            </Card>
            
        )
    }
}

export default UserProjectTable;