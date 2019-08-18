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
class ProjectTable extends Component {
    constructor(props){
        super(props)
        this.state ={
            projects : [],
            filteredProjects: [],
            size:0,
            query:'',
            sort:0,
            sortKey:'',
            createProject:false,
            projectsPerPage : 10,
            currentPage : 1,
        }
    }
    async getUser(projects){
        return Promise.all(projects.map(async (project)=>{project.users = await listUser(project.id); return project}))
    }
  
    async componentDidMount(){
        let   projects = await  list(this.state.currentPage,this.state.projectsPerPage)
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
    
    onChange=async(e)=>{
        let   projects = await  list(this.state.currentPage,this.state.projectsPerPage)
        this.setState({
              size : projects.size
        })
        projects = projects.projects
        
        projects =await this.getUser(projects)
        this.setState({
            projects : projects,
            filteredProjects :projects
        })
        if(this.state.sort>0) this.onAscendingSort( e,this.state.sortKey ) 
        else if(this.state.sort<0) this.onDescendingSort(e,this.state.sortKey)
    }
    onDropDownChange = (e)=>{
        this.setState({
            projectsPerPage : Number(e.target.value)
        })
    }

    onCreateProject = async(e)=>{
        this.setState({
            createProject : !this.state.createProject
        })
    }   
   
    onAscendingSort=(e,sortKey)=>{
        this.state.sort=1;
        this.state.sortKey=sortKey
        const filteredProjects = this.state.filteredProjects
        filteredProjects.sort((a,b)=>a[sortKey].localeCompare(b[sortKey]))
        this.setState({filteredProjects})
    }
    onDescendingSort=(e,sortKey)=>{
        this.state.sort=-1;
        this.state.sortKey=sortKey
        const filteredProjects = this.state.filteredProjects
        filteredProjects.sort((a,b)=>b[sortKey].localeCompare(a[sortKey]))
        this.setState({filteredProjects})
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

   

    //FOR Pangination
    onPreviousClick =async (e)=>{
        if(this.state.currentPage!=1)
            await this.setState({
                currentPage : this.state.currentPage-1
            })
        this.onChange(e)
        
    }
    onNextClick =async (e)=>{
        const {size,projectsPerPage} = this.state
        const lastPage=Math.ceil(size/projectsPerPage)
        if(this.state.currentPage!=lastPage)
            await this.setState({
                currentPage : this.state.currentPage+1
            })
        this.onChange(e)
    }
    onPaginationClick = async(e)=>{
        await this.setState({
            currentPage : Number(e.target.value)
        })
        console.log(this.state.currentPage)
        await this.onChange(e)
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
                        <Button className="btn-success ml-sm-2" onClick={this.onCreateProject}>Start a new Project</Button>
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
                    <Pagination>
                        <PaginationItem previous>
                                <PaginationLink onClick={this.onPreviousClick}>Previous</PaginationLink>
                        </PaginationItem>
                        {
                            pageNumbers.map((page)=>{
                                return(
                                    <PaginationItem>
                                        <PaginationLink value={page}  onClick={this.onPaginationClick}>{page} </PaginationLink>
                                    </PaginationItem>
                                )
                            })
                        }
                        <PaginationItem next> 
                                <PaginationLink  onClick={this.onNextClick} >Next</PaginationLink>
                        </PaginationItem>
                    </Pagination>
               </div> 

               </CardBody>
                
            </Card>
            
        )
    }
}

export default ProjectTable;