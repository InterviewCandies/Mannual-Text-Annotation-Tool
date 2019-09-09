import React,{Component} from 'react'
import {
    ButtonGroup,
    Badge,
    Button,
} from 'reactstrap'


import EditDocumentModal from '../../Modal/EditDocumentModal';
import DeleteDocumentModal from '../../Modal/DeleteDocumentModal';
import VerifyDocumentModal from '../../Modal/VerifyDocumentModal';

class DatasetData extends Component{
    constructor(props){
        super(props)
        this.state={
            edit :  false,
            delete: false,
            verify:false
        }
           
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
    onVerify=(e)=>{
        this.setState({
            verify : !this.state.verify
        })
    }
    //String truncate

    stringTruncate(str, limit, end) {
        limit = (limit)? limit : 100;
        end = (end)? end : '...';
        str = str.split(' ');  
        if (str.length > limit) {
          let cutTolimit = str.slice(0, limit);
          return cutTolimit.join(' ') + ' ' + end;
        }
  
        return str.join(' ');
      }
    render(){
        const {content,labels,status,created_at,updated_at} = this.props.data
        return(
            <tr>
                <td>{ this.stringTruncate(content,50) }</td>
               
                <td>{(status=='Verified')?<Badge color="success">Verified</Badge>
                                             :<Badge color="danger">Not Verified</Badge>}</td>
                <td>{ created_at }</td>
                <td>{ updated_at }</td>
                <td>
                <ButtonGroup>
                        
                        <Button color="success" onClick={this.onVerify}>
                            <i className="fa fa-check" ></i>
                            <VerifyDocumentModal  trigger={this.state.verify}
                                                  toggle={this.onVerify}
                                                  data={this.props.data}
                                                  labels={labels}
                                                  action={this.props.action}>

                            </VerifyDocumentModal>
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