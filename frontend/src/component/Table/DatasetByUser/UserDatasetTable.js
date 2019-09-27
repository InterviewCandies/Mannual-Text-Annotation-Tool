import React,{Component} from 'react'
import {
    Card,
    CardBody,
    Button
} from 'reactstrap'
import { listDocument, getUserDocs } from '../../../functions/dataset.function';
import CustomPagination from '../../Pagination/CustomPagination';
import Spinner from '../../Spinner/Spinner';
import UserDatasetData from './UserDatasetData'

class UserDatasetTable extends Component {
    constructor(props){
        super(props)
        this.state ={
            dataset : [],
            filteredDataset:[],
            size:0,
            sortKey: 'content',
            searchKey: '',
            trend: 1,
            documentPerPage:10,
            currentPage:1,
            maxDocs : this.props.maxDocs,
            loading : false,
            verify : false
        }
        this.projectId = this.props.projectId
        this.userId = this.props.userId
    }
   
    
    async componentDidMount(){
        const {maxDocs} = this.state
        const result = await getUserDocs(this.projectId,this.userId,maxDocs)
        const {dataset,size} = result
        this.setState({
            dataset:dataset,
            filteredDataset: dataset,
            size:size?size:0,
            loading : true
        })

    }
    onChange=async()=>{
        
    }
    onSort=async (sortKey,trend)=>{
        
    }

    onDropDownChange = async(e)=>{
        await this.setState({
            documentPerPage : Number(e.target.value),
            currentPage : 1
        })
    }
   
    onSearchChange=async(e)=>{
        
    }
    onPaginationClick =async (e)=>{
       await this.setState({
           currentPage : e
       })
    }

    displayDocument =  (dataset)=>{
            dataset = dataset || []
            return dataset.map(  (document,i)=>{
            return  <UserDatasetData data={document} key={i}></UserDatasetData>
        })
         
  
    }
    render(){
         const {size,documentPerPage,currentPage,filteredDataset} = this.state
         const pageNumbers = []
         for(let i=1;i<=Math.ceil(size/documentPerPage);i++)
             pageNumbers.push(i);
        const indexOfLastDocument = currentPage*documentPerPage
        const indexOfFirstDocument=indexOfLastDocument-documentPerPage
        let currentDataset = filteredDataset.slice(indexOfFirstDocument,indexOfLastDocument)
        return(
            <div>
            {this.state.loading? <Card id="card">
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

export default UserDatasetTable;