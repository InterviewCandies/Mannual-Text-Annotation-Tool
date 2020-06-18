import React,{Component} from 'react'
import {
    ButtonGroup,
    Badge,
    Button,
} from 'reactstrap'


import EditDocumentModal from '../../Modal/EditDocumentModal';
import DeleteDocumentModal from '../../Modal/DeleteDocumentModal';

class DatasetData extends Component{
    constructor(props){
        super(props)
        this.state={
            edit :  false,
            delete: false,
        }
           
    }
    onEdit = () => {
        this.setState(preState => ({
            edit : !preState.edit
        }));
    }
    onDelete = () => {
        this.setState(prevState => ({
            delete: !prevState.delete
        }))
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
        const {content,created_at,updated_at} = this.props.data
        return(
            <tr>
                <td>{ this.stringTruncate(content,50) }</td>
                <td>{ created_at }</td>
                <td>{ updated_at }</td>
                <td>
                <ButtonGroup>
                        
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