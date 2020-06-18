import React,{Component} from 'react'
import {
    Card,
    CardBody,
    Button
} from 'reactstrap'
import { getUserDocs } from '../../../functions/dataset.function';
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
        this.projectId = this.props.projectId;
        this.userId = this.props.userId;
        this.timeout = 0;
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
    onSort=async (sortKey,trend)=>{
        await this.setState({
             sortKey,
             trend,
        })
    }
    sort_by = function(field, reverse, primer){

        var key = primer ? 
            function(x) {return primer(x[field])} : 
            function(x) {return x[field]};
     
        reverse = !reverse ? 1 : -1;
     
        return function (a, b) {
            return a = key(a), b = key(b), reverse * (a.localeCompare(b));
        } 
    }

    onDropDownChange = async(e)=>{
        await this.setState({
            documentPerPage : Number(e.target.value),
            currentPage : 1
        })
    }
   

    onSearchChange=async(e)=>{
        const searchKey = e.target.value
        if(this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.setState({
                searchKey,
                currentPage : 1
            },()=>{
             this.filterArray();
            })
        }, 300);
    }
    filterArray = () => {
        let {searchKey,filteredDataset,dataset} = this.state
        if(searchKey.length>0) {
            filteredDataset = dataset.filter( element => 
                element.content.toUpperCase().includes(searchKey.toUpperCase()) || 
                element.created_at.toUpperCase().includes(searchKey.toUpperCase()) || 
                element.updated_at.toUpperCase().includes(searchKey.toUpperCase())
            )
        }
        else filteredDataset = dataset
        this.setState({
             filteredDataset
        })
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
         const {documentPerPage,currentPage,sortKey,trend} = this.state
         let {filteredDataset} = this.state
         const size = filteredDataset.length
         const pageNumbers = []
         for(let i=1;i<=Math.ceil(size/documentPerPage);i++)
             pageNumbers.push(i);
        const indexOfLastDocument = currentPage*documentPerPage
        const indexOfFirstDocument=indexOfLastDocument-documentPerPage
        filteredDataset = filteredDataset.sort(this.sort_by(sortKey,trend < 0,function(a){return a.toUpperCase()}))
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
                
            </Card>  : <div className="text-center lead"> <i className="fa fa-spinner fa-spin"></i> Loading documents... </div>}
            
            </div>
        )
    }
}

export default UserDatasetTable;