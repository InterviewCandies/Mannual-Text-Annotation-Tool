import React,{Component} from 'react'
import dateFormat from '../../../utils/dateFormat'
import {
    ButtonGroup,
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    Badge,
    Card,
    CardBody
} from 'reactstrap'
import { list, listUser, search } from '../../../functions/project.function';
import { throwStatement } from '@babel/types';
import EditProjectModal from '../../Modal/EditProject.modal';
import ProjectData from './ProjectData'
import CreateProjectModal from '../../Modal/CreateProject.modal';
import { async } from 'q';
import { listLabel } from '../../../functions/label.function';
import CustomPagination from '../../Pagination/CustomPagination';
class ProjectTable extends Component {
    constructor(props){
        super(props)
        this.state ={
            projects : [],
            filteredProjects: [],
            size:0,
            query:'',
            trend:1,
            sortKey:'project_name',
            createProject:false,
            projectsPerPage : 10,
            currentPage : 1,
        }
    }
    async getUser(projects){
        if(!projects)  return [];
        return Promise.all(projects.map(async (project)=>{project.users = await listUser(project.id); return project}))
    }
  
    async componentDidMount(){
        const {currentPage,projectsPerPage,sortKey,trend} = this.state
        let   projects = await  list(currentPage,projectsPerPage,sortKey,trend)
        this.setState({
            size : projects.size?projects.size:0
        })
        projects = projects.projects
    
        projects =await this.getUser(projects)
        this.setState({
            projects : projects,
            filteredProjects :projects
        })
        
    }
    
    onChange=async(e)=>{
        const {currentPage,projectsPerPage,sortKey,trend}  = this.state
        let   projects = await  list(currentPage,projectsPerPage,sortKey,trend)
        this.setState({
              size : projects.size
        })
        projects = projects.projects
        
       projects =await this.getUser(projects)
        this.setState({
            projects : projects,
            filteredProjects :projects
        })
       
    }
    onDropDownChange =async (e)=>{
        await this.setState({
            projectsPerPage : Number(e.target.value)
        })
        this.onChange(e)
    }

    onCreateProject = async(e)=>{
        this.setState({
            createProject : !this.state.createProject
        })
    }   
   
    onSort=(e,sortKey,value)=>{
         this.setState({
               trend : value,
               sortKey:sortKey  
         })
         this.onChange(e)
    }
   
    onSearchChange=async (e)=>{
        const query = e.target.value
        const {projectsPerPage} =this.state
        let result={}
        if(query) result = await search(1,projectsPerPage,query)
        else result = await list(1,projectsPerPage,query)
        const projects =await this.getUser(result.projects)
         this.setState({
            filteredProjects : projects,
            size :  result.size
        })
    }

   

    
    onPaginationClick = async(e)=>{
        await this.setState({
            currentPage :e
        })
        this.onChange(e)
    }


    //Presenting Projects 
    displayProjects = (currentsProjects)=>{
           
            return currentsProjects.map( (project,i)=>{
            return  <ProjectData data={project} 
                                 key={i} 
                                 action={this.onChange} 
                                 users={project.users} 
                                 >
                    </ProjectData>
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
                        <Button className="btn-success ml-sm-3" onClick={this.onCreateProject}>Start a new Project</Button>
                        <CreateProjectModal trigger={this.state.createProject}
                                            toggle={this.onCreateProject}
                                            action={this.onChange}></CreateProjectModal>
                  </div>
                  
                  <div className="form-group form-inline">
                      <label className="mr-sm-2">Search:</label>
                      <input className="form-control mr-sm-2" type="text" onChange={this.onSearchChange}></input>
                  </div>
                </div>
                <table className="table table-striped table-bordered">
                    <thead>
                        <th >
                            Name
                            <div className="float-right">
                                <i className="fa fa-arrow-up" onClick={e=>this.onSort(e,"project_name",1)}></i>
                                <i className="fa fa-arrow-down" onClick={e=>this.onSort(e,"project_name",-1)} ></i>
                            </div>
                        </th>
                        <th >
                            Description
                            <div className="float-right">
                                <i className="fa fa-arrow-up" onClick={e=>this.onSort(e,"project_description",1)}></i>
                                <i className="fa fa-arrow-down" onClick={e=>this.onSort(e,"project_description",-1)} ></i>
                            </div>
                        </th>
                        <th>User</th>
                        <th >
                           Created at
                            <div className="float-right">
                                <i className="fa fa-arrow-up" onClick={e=>this.onSort(e,"created_at",1)}></i>
                                <i className="fa fa-arrow-down" onClick={e=>this.onSort(e,"created_at",-1)} ></i>
                            </div>
                        </th>
                        <th >
                          Updated at
                            <div className="float-right">
                                <i className="fa fa-arrow-up" onClick={e=>this.onSort(e,"updated_at",1)}></i>
                                <i className="fa fa-arrow-down" onClick={e=>this.onSort(e,"updated_at",-1)} ></i>
                            </div>
                        </th>
                        <th >Actions</th>
                        
                    </thead>
                    <tbody>
                    {this.displayProjects(currentsProjects)}
                    </tbody>
                </table>

               
               <div className="d-flex flex-row justify-content-between">
                    <p >
                      {`Show ${Math.min(indexOfFirstProject+1,size) } to ${Math.min(indexOfLastProject,size)} of ${size} entries`}
                    </p>
                    <CustomPagination  pages={pageNumbers.length}
                                       currentPage={currentPage}
                                       onClick={this.onPaginationClick}></CustomPagination>
               </div> 

               </CardBody>
                
            </Card>
            
        )
    }
}

export default ProjectTable;