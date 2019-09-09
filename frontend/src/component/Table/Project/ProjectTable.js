import React,{Component} from 'react'
import {
    Button,
    Card,
    CardBody
} from 'reactstrap'
import { list, search } from '../../../functions/project.function';
import ProjectData from './ProjectData'
import CreateProjectModal from '../../Modal/CreateProjectModal';
import CustomPagination from '../../Pagination/CustomPagination';
import Spinner from '../../Spinner/Spinner';
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
            loading : false
        }
    }
    
  
    async componentDidMount(){
        const {currentPage,projectsPerPage,sortKey,trend} = this.state
        let  result = await  list(currentPage,projectsPerPage,sortKey,trend)
        
        const {projects,size} = result
        this.setState({
            filteredProjects : projects,
            size:size?size:0,
            loading : true
        })
       
        
    }
    
    onChange=async()=>{
        const {currentPage,projectsPerPage,sortKey,trend}  = this.state
        let  result = await  list(currentPage,projectsPerPage,sortKey,trend)
        const {projects,size} = result
        this.setState({
            size : size?size:0
        })
        this.setState({
            filteredProjects : projects
        })
        
       
    }
    onDropDownChange =async (e)=>{
        await this.setState({
            projectsPerPage : Number(e.target.value),
            currentPage :1
        })
        this.onChange()
    }

    onCreateProject = async()=>{
        this.setState({
            createProject : !this.state.createProject
        })
    }   
   
    onSort=async (sortKey,value)=>{
         await this.setState({
               trend : value,
               sortKey:sortKey  
         })
        this.onChange()
    }
   
    onSearchChange=async (e)=>{
        const query = e.target.value
        const {projectsPerPage} =this.state
        let result={}
        if(query) result = await search(1,projectsPerPage,query)
        else result = await list(1,projectsPerPage,query)
      
         this.setState({
            filteredProjects : result.projects,
            size :  result.size
        })
    }

   

    
    onPaginationClick = async(e)=>{
        await this.setState({
            currentPage :e
        })
        this.onChange()
    }


    //Presenting Projects 
    displayProjects = (currentsProjects)=>{
            currentsProjects = currentsProjects || []
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
         let currentsProjects = filteredProjects
        return(
             <div>
                 {this.state.loading?  
                  <Card onClick={(e)=>{e.stopPropagation()}}>
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
                    <table className="table table-striped table-bordered text-center">
                        <thead>
                            <th >
                                Name
                                <div className="float-right" >
                                   <i className="fa fa-arrow-up mb-sm-0 p-sm-0" onClick={this.onSort.bind(this,"project_name",1)}></i>
                                   <i className="fa fa-arrow-down mt-sm-0 p-sm-0" onClick={this.onSort.bind(this,"project_name",-1)}></i>
                                </div>
                            </th>
                            <th >
                                Description
                                <div className="float-right">
                                    <i className="fa fa-arrow-up" onClick={this.onSort.bind(this,"project_description",1)}></i>
                                    <i className="fa fa-arrow-down" onClick={this.onSort.bind(this,"project_description",-1)} ></i>
                                </div>
                            </th>
                            <th>User</th>
                            <th >
                                Created at
                                <div className="float-right">
                                    <i className="fa fa-arrow-up" onClick={this.onSort.bind(this,"created_at",1)}></i>
                                    <i className="fa fa-arrow-down" onClick={this.onSort.bind(this,"created_at",-1)} ></i>
                                </div>
                            </th>
                            <th >
                                Updated at
                                <div className="float-right">
                                    <i className="fa fa-arrow-up" onClick={this.onSort.bind(this,"updated_at",1)}></i>
                                    <i className="fa fa-arrow-down" onClick={this.onSort.bind(this,"updated_at",-1)} ></i>
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
                  
                  </Card>: <Spinner content='projects'></Spinner>}
             </div>  
            
        )
    }
}

export default ProjectTable;