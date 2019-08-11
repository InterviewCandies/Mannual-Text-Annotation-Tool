import React,{Component} from 'react'
import dateFormat from '../../../util/dateFormat'
import {
    ButtonGroup,
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    Card,
    CardBody
} from 'reactstrap'
import { list } from '../../../functions/project.function';
import { throwStatement } from '@babel/types';
const Project = (props) =>(
     <tr>
         <td>{props.data.project_name}</td>
         <td>{props.data.project_description}</td>
         <td>{props.data.users}</td>
         <td>{props.data.label}</td>
         <td>{dateFormat(props.data.created_at) }</td>
         <td>{dateFormat(props.data.updated_at) }</td>
         <td>
             <ButtonGroup>
                <Button><i className="fa fa-edit"></i></Button>
                <Button><i className="fa fa-trash"></i></Button>
             </ButtonGroup>
         </td>
     </tr>
)

class ProjectTable extends Component {
    constructor(props){
        super(props)
        this.state ={
            projects : [],
            filteredProjects: [],
            query:'',
            projectsPerPage : 10,
            currentPage : 1
        }
    }
    async componentDidMount(){
        const projects = await list()
        this.setState({
            projects : projects,
            filteredProjects : projects
        })
     
        
    }
    onSearchChange=(e)=>{
        const query = e.target.value
        this.setState((prevState)=>{
                const filteredProjects = prevState.projects.filter(function (item) {
                    return Object.values(item).map(function (value) {
                      return String(value).toLowerCase();
                    }).find(function (value) {
                        return value.includes(query.toLowerCase());
                    });
                  });
                return{
                    query,
                    filteredProjects
                }
        })
    }
    onAscendingSort=(e,sortKey)=>{
            const filteredProjects = this.state.filteredProjects
            filteredProjects.sort((a,b)=>a[sortKey].localeCompare(b[sortKey]))
            this.setState({filteredProjects})
    }
    onDescendingSort=(e,sortKey)=>{
        const filteredProjects = this.state.filteredProjects
        filteredProjects.sort((a,b)=>b[sortKey].localeCompare(a[sortKey]))
        console.log(filteredProjects)
        this.setState({filteredProjects})
}
    onDropDownChange = (e)=>{
        this.setState({
            projectsPerPage : Number(e.target.value)
        })
    }
    onPaginationClick = (e)=>{
        const {projects,projectsPerPage,currentPage} = this.state
        this.setState({
            currentPage : currentPage*Number(e.target.id) + Number(e.target.value)
        })
    }
    displayProjects =(currentsProjects)=>{
        return currentsProjects.map((project,id)=>{
            return <Project data={project} key={id}></Project>
        })
    }
    render(){
        //for Pagination
        const {filteredProjects,projectsPerPage,currentPage} = this.state
        const pageNumbers = []
        for(let i=1;i<=Math.ceil(filteredProjects.length/projectsPerPage);i++)
            pageNumbers.push(i);

        //for display Project
         //Show project based on pagination
         const indexOfLastProject = currentPage*projectsPerPage
         const indexOfFirstProject =indexOfLastProject-projectsPerPage
         const currentsProjects = filteredProjects.slice(indexOfFirstProject,indexOfLastProject)
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
                        <th scope="col">Label</th>
                        <th scope="col">
                            Date created
                            <div className="float-right">
                                <i className="fa fa-arrow-up" onClick={e=>this.onAscendingSort(e,"created_at")}></i>
                                <i className="fa fa-arrow-down" onClick={e=>this.onDescendingSort(e,"created_at")} ></i>
                            </div>
                        </th>
                        <th scope="col">
                            Last updated
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
                      {`Show ${Math.min(indexOfFirstProject+1,filteredProjects.length) } to ${Math.min(indexOfLastProject,filteredProjects.length)} of ${filteredProjects.length} entries`}
                    </p>
                    <Pagination>
                        <PaginationItem previous>
                                <PaginationLink value='-1' id='1' onClick={this.onPaginationClick}>Previous</PaginationLink>
                        </PaginationItem>
                        {
                            pageNumbers.map((page)=>{
                                return(
                                    <PaginationItem>
                                        <PaginationLink value={page} id='0' onClick={this.onPaginationClick}>{page}</PaginationLink>
                                    </PaginationItem>
                                )
                            })
                        }
                        <PaginationItem next> 
                                <PaginationLink value='1' id='1' onClick={this.onPaginationClick} >Next</PaginationLink>
                        </PaginationItem>
                    </Pagination>
               </div> 

               </CardBody>
                
            </Card>
            
        )
    }
}

export default ProjectTable;