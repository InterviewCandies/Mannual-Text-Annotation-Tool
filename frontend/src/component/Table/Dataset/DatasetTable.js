import React,{Component} from 'react'
import {
    Card,
    CardBody,
    Button
} from 'reactstrap'
import { listDocument } from '../../../functions/dataset.function';
import DatasetData from './DatasetData';
import CustomPagination from '../../Pagination/CustomPagination';
import Spinner from '../../Spinner/Spinner';
import { get } from '../../../functions/project.function';
import UserRecordModal from '../../Modal/UserRecordModal';
import { toast } from 'react-toastify';

class DatasetTable extends Component {
    constructor(props){
        super(props)
        this.state ={
            users: [],
            dataset : [],
            currentUser:'',
            currentUsername:'',
            size:0,
            sortKey: 'content',
            searchKey: '',
            trend: 1,
            documentPerPage:10,
            currentPage:1,
            verifiedDocs:10,
            loading : false,
            verify : false
        }
    }
   
    
    async componentDidMount(){
        const {currentPage,documentPerPage,sortKey,trend,searchKey} = this.state
        const result = await listDocument(this.props.projectId,currentPage,documentPerPage,sortKey,trend,searchKey)
        const {dataset,size} = result
        this.setState({
            dataset:dataset,
            users : this.props.users || [],
            size:size?size:0,
            loading : true
        })

    }
    onChange=async()=>{
        const {currentPage,documentPerPage,sortKey,trend,searchKey} = this.state
        const result = await listDocument(this.props.projectId,currentPage,documentPerPage,sortKey,trend,searchKey)
        const {dataset,size} = result
        this.setState({
            dataset:dataset,
            size:size?size:0
        })
    }
    onSort=async (sortKey,trend)=>{
        await this.setState({
             sortKey:sortKey,
             trend:trend
        })
        await this.onChange()
    }

    onDropDownChange = async(e)=>{
        await this.setState({
            documentPerPage : Number(e.target.value),
            currentPage : 1
        })
        this.onChange()
    }
    onDropDownUserChange = async(e)=>{
        const sel = document.getElementById("selectedUser");
        const text= sel.options[sel.selectedIndex].text;
        await this.setState({
            currentUser : e.target.value,
            currentUsername : text,
            currentPage : 1
        })
        this.onChange()
    }
    onDropDownDocsChange = async(e)=>{
        await this.setState({
            verifiedDocs : Number(e.target.value),
            currentPage : 1
        })
        this.onChange()
    }
   
   
    onSearchChange=async(e)=>{
        const query = e.target.value
        if(this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.setState({
                searchKey : query,
                currentPage : 1
            },()=>{
             this.onChange()
            })
        }, 300);
    }
    onVerify = async(e) =>{
        const {currentUser} = this.state
        if(currentUser.length <= 0) {
              toast.error('Error: User must be specified')
              return
        }
        await this.setState({
             verify : !this.state.verify
        })
    }
    onPaginationClick =async (e)=>{
        await this.setState({
            currentPage : e
        })
        await this.onChange()
    }

    displayDocument =  (dataset)=>{
             dataset = dataset || []
            return dataset.map(  (document,i)=>{
            return  <DatasetData data={document} key={i} action={this.onChange}></DatasetData>
        })
    }
    
    render(){
         const {size,dataset,documentPerPage,currentPage,users} = this.state
         const pageNumbers = []
         for(let i=1;i<=Math.ceil(size/documentPerPage);i++)
             pageNumbers.push(i);
        const indexOfLastDocument = currentPage*documentPerPage
        const indexOfFirstDocument=indexOfLastDocument-documentPerPage
        let currentDataset = dataset
       
        return(
            <div>
            {this.state.loading? <Card id="card">
                <CardBody>
                <div className="d-flex flex-row justify-content-between">
                  <div className="form-group form-inline">
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
                        <label  className="mr-sm-2">User</label>
                         <select class="custom-select mr-sm-2" id="selectedUser" onChange={this.onDropDownUserChange} >
                            <option value="">None</option>
                            {
                                users.map(user=> <option value={user.id} >{user.username}</option>)
                            }
                        </select>
                        <label  className="mr-sm-2">Docs</label>
                         <select class="custom-select mr-sm-2" id="dropdown" onChange={this.onDropDownDocsChange} >
                            <option value="10" selected>10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <Button color="success m-sm-2" onClick={this.onVerify}>Verify docs</Button>
                        <UserRecordModal  trigger={this.state.verify}
                                                  toggle={this.onVerify}
                                                  projectId={this.props.projectId}
                                                  userId = {this.state.currentUser}
                                                  maxDocs = {this.state.verifiedDocs}
                                                  username = {this.state.currentUsername}
                                               ></UserRecordModal>
                  </div>
                  <div className="form-group form-inline">
                      <label className="mr-sm-2">Search:</label>
                      <input className="form-control mr-sm-2" type="text" onChange={this.onSearchChange}></input>
                  </div>
                </div>
                <table className="table table-striped table-bordered text-center">
                    <thead>
                        <th scope="col">
                            Content
                            <div className="float-right">
                                <i className="fa fa-arrow-up" onClick={this.onSort.bind(this,'content',1)}></i>
                                <i className="fa fa-arrow-down"  onClick={this.onSort.bind(this,'content',-1)}></i>
                            </div>
                        </th>
                        
                
                        <th scope="col">
                            Created at
                            <div className="float-right">
                                <i className="fa fa-arrow-up" onClick={this.onSort.bind(this,'created_at',1)}></i>
                                <i className="fa fa-arrow-down" onClick={this.onSort.bind(this,'created_at',-1)}></i>
                            </div>
                        </th>
                        <th scope="col">
                            Updated at
                            <div className="float-right">
                                <i className="fa fa-arrow-up" onClick={this.onSort.bind(this,'updated_at',1)}></i>
                                <i className="fa fa-arrow-down" onClick={this.onSort.bind(this,'updated_at',-1)} ></i>
                            </div>
                        </th>
                        <th scope="col">Actions</th>
                        
                    </thead>
                    <tbody>
                    {this.displayDocument(currentDataset)}
                    </tbody>
                </table>
                
               <div className="d-flex flex-row justify-content-between">
                    <p >
                      {`Show ${Math.min(indexOfFirstDocument+1,size) } to ${Math.min(indexOfLastDocument,size)} of ${size} entries`}
                    </p>
                    <CustomPagination pages={pageNumbers.length} 
                                     currentPage={currentPage}
                                     onClick={this.onPaginationClick}>           
                    </CustomPagination>
               </div> 

               
              
               </CardBody>
                
            </Card>  : <Spinner content='document'></Spinner>}
            
            </div>
        )
    }
}

export default DatasetTable;