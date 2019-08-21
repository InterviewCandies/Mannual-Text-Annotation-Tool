import React,{Component} from 'react'
import {
    ButtonGroup,
    Button,
    Card,
    CardBody
} from 'reactstrap'
import { listDocument, searchDocument } from '../../../functions/dataset.function';
import DatasetData from './DatasetData';
import CustomPagination from '../../Pagination/CustomPagination';

class DatasetTable extends Component {
    constructor(props){
        super(props)
        this.state ={
            dataset : [],
            size:0,
            documentPerPage:10,
            currentPage:1
           
        }
    }
   
    
    async componentDidMount(){
        const {currentPage,documentPerPage} = this.state
        const result = await listDocument(this.props.projectId,currentPage,documentPerPage)
        this.setState({
            dataset:result.dataset,
            size:result.size
        })
    }
    onChange=async(e)=>{
        const {currentPage,documentPerPage} = this.state
        const result = await listDocument(this.props.projectId,currentPage,documentPerPage)
        this.setState({
            dataset:result.dataset,
            size:result.size
        })
    }

    onDropDownChange = async(e)=>{
        await this.setState({
            documentPerPage : Number(e.target.value)
        })
        this.onChange(e)
    }
   
    onSearchChange=async(e)=>{
        const query = e.target.value
        const {documentPerPage} =this.state
        let result={}
        if(query) result = await searchDocument(this.props.projectId,1,documentPerPage,query)
        else result = await listDocument(this.props.projectId,1,documentPerPage,query)
         this.setState({
            dataset : result.dataset,
            size :  result.size
        })
    }
   
    onPaginationClick =async (e)=>{
        await this.setState({
            currentPage : e
        })
        await this.onChange(e)
    }

    displayDocument =  (dataset)=>{
            return dataset.map(  (document,i)=>{
            return  <DatasetData data={document} key={i} action={this.onChange}></DatasetData>
        })
         
  
    }
    render(){
         const {size,dataset,documentPerPage,currentPage} = this.state
         const pageNumbers = []
         for(let i=1;i<=Math.ceil(size/documentPerPage);i++)
             pageNumbers.push(i);
        const indexOfLastDocument = currentPage*documentPerPage
        const indexOfFirstDocument=indexOfLastDocument-documentPerPage
        const currentDataset = dataset
       
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
                            Content
                            <div className="float-right">
                                <i className="fa fa-arrow-up" ></i>
                                <i className="fa fa-arrow-down"  ></i>
                            </div>
                        </th>
                        <th scope="col">
                            Label
                            <div className="float-right">
                                <i className="fa fa-arrow-up" ></i>
                                <i className="fa fa-arrow-down" ></i>
                            </div>
                        </th>
                        <th scope="col">
                            Status
                            <div className="float-right">
                                <i className="fa fa-arrow-up" ></i>
                                <i className="fa fa-arrow-down" ></i>
                            </div>
                        </th>

                        <th scope="col">
                            Created at
                            <div className="float-right">
                                <i className="fa fa-arrow-up" ></i>
                                <i className="fa fa-arrow-down" ></i>
                            </div>
                        </th>
                        <th scope="col">
                            Updated at
                            <div className="float-right">
                                <i className="fa fa-arrow-up" ></i>
                                <i className="fa fa-arrow-down"  ></i>
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
                
            </Card>
            
        )
    }
}

export default DatasetTable;