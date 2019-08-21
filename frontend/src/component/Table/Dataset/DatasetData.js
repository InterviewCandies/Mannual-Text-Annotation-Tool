import React,{Component} from 'react'
import { Link,Route} from 'react-router-dom'
import {
    ButtonGroup,
    Badge,
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    Card,
    CardBody
} from 'reactstrap'


import dateFormat from '../../../utils/dateFormat'
import EditDocumentModal from '../../Modal/EditDocument.modal';
import DeleteDocumentModal from '../../Modal/DeleteDocument';
class DatasetData extends Component{
    constructor(props){
        super(props)
        this.state={
            edit :  false,
            delete: false
        }
           
    }
   
    //Listen to changes
   componentDidUpdate(oldProps){
        const props =this.props
            if(oldProps.data != props.data )
            this.setState({
               
            })
     
    }
    onEdit=(e)=>{
        this.setState({
            edit : !this.state.edit
        })
    }
    onDelete=(e)=>{
        this.setState({
            delete: !this.state.delete
        })
    }
    
   
    render(){
        return(
            <tr>
                <td>{this.props.data.content}</td>
                <td>labels</td>
                <td>{(this.props.data.status=='Verified')?<Badge color="success">Verified</Badge>
                                             :<Badge color="danger">Not Verified</Badge>}</td>
                <td>{ dateFormat( this.props.data.created_at) }</td>
                <td>{ dateFormat( this.props.data.updated_at) }</td>
                <td>
                <ButtonGroup>
                        
                        <Button color="success">
                            <i className="fa fa-check" ></i>
                          
                        </Button>
                       
                        <Button color="primary" onClick={this.onEdit}>
                            <i className="fa fa-edit"></i>
                           
                            <EditDocumentModal  trigger={this.state.edit}
                                                toggle={this.onEdit}
                                                data={this.props.data}
                                                action={this.props.action}>
                            </EditDocumentModal>
                          
                        </Button>
                        <Button color="danger" onClick={this.onDelete}>
                            <i className="fa fa-trash"></i>
                            <DeleteDocumentModal trigger={this.state.delete}
                                                toggle={this.onDelete}
                                                data={this.props.data}
                                                action={this.props.action}></DeleteDocumentModal>
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
        )
    }
}
export default DatasetData