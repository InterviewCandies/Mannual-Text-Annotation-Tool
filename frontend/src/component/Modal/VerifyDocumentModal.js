import React,{Component} from 'react'
import {
   Button,
   ButtonGroup,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
import { verifyDocument } from '../../functions/dataset.function';
import EditAnnotationModal from './EditAnnotationModal';
const LabelCard =props=>(
    <ButtonGroup className="mr-sm-2 mb-sm-2">
        <Button  style={{background: props.label.backgroundColor, color:props.label.textColor}}>
            <i  className="fa fa-times-circle" > {props.label.content}</i>
        </Button>
     
        <Button  disabled>{props.label.shortcut}</Button>
        
    </ButtonGroup>
)
class VerifyDocumentModal extends Component{
    constructor(props){
        super(props);
        this.state = {
             id : this.props.data.id,
             labels: this.props.data.labels,
             edit:false,
             status: (this.props.data.status=='Verified')?true:false
        }
        this.onToggle = this.props.toggle
    }
    componentDidUpdate(oldProps){
        const props = this.props
        if( oldProps.data!= props.data) {
           this.setState({
            id : this.props.data.id,
            labels: this.props.data.labels,
            status: (this.props.data.status=='Verified')?true:false
           })
        }
    }

   
    onSubmit = async (e)=>{
        e.preventDefault()
        const status = (this.state.status)?'Verified':'Not Verified'
        const result = await verifyDocument(this.state.id,status)
        this.onToggle()
        this.props.action()
    }
    onEdit=(e)=>{
         this.setState({
             edit : !this.state.edit
         })
    }
    onVerify = (e)=>{
        this.setState({
             status: !this.state.status
        })
    }
       render(){
           const {labels,status} =this.state
           return(
                <Modal isOpen={this.props.trigger} toggle={this.onToggle}
                    className={'modal-success ' + this.props.className}>
                <ModalHeader toggle={this.onToggle}>Verify annotation</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <h5>Content</h5>
                        <textarea className="form-control-plaintext border" readOnly >{this.props.data.content}</textarea>
                     </div>
                     <div className="form-group">
                        <h5>Label:</h5>
                        <div>
                         { (labels.length)? labels.map(label=>  <LabelCard label={label}></LabelCard>):<div></div>}
                        </div>
                        
                        <a href="javascript:void(0);"
                           onClick={this.onEdit} 
                           style={{textDecoration : "none"}}>
                            <i className="fa fa-cog"></i> Add/Remove labels
                        </a>
                        <EditAnnotationModal    trigger={this.state.edit}
                                                toggle={this.onEdit}
                                                data={this.props.data}
                                               action={this.props.action}></EditAnnotationModal>
                     </div>
                    <div className="form-check">
                        <input class="form-check-input" 
                               type="checkbox" 
                               id="verify" 
                               checked={status}
                               onClick={this.onVerify}
                              
                        />
                        <label class="form-check-label" for="verify">
                            <div className="lead">Accept annotation</div>
                        </label>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={this.onSubmit}>Save</Button>{' '}
                    <Button color="secondary" onClick={this.onToggle}>Cancel</Button>
                  </ModalFooter>
               </Modal>

           )
       }
}

export default VerifyDocumentModal 