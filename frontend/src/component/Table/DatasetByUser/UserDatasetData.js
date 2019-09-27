import React,{Component} from 'react'
import {
    ButtonGroup,
    Badge,
    Button,
} from 'reactstrap'

import VerifyDocumentModal from '../../Modal/VerifyDocumentModal';

class UserDatasetData extends Component{
    constructor(props){
        super(props)
        this.state={
            verify:false
        }
           
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
                       
                        
                    </ButtonGroup>
                </td>
            </tr>
        )
    }
}
export default UserDatasetData