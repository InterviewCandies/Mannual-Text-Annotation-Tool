import React,{Component} from 'react'
import {
   Button,
   ButtonGroup,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
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
        }
        this.onToggle = this.props.toggle

    }
    componentDidUpdate(oldProps){
        const props = this.props
        if( oldProps.data != props.data) {
           this.setState({
            id : this.props.data.id,
            labels: this.props.data.labels,
           })
        }
    }

    onEdit= () => {
         this.setState(prevState => ({
             edit : !prevState.edit
         }));
    }
  
       render(){
           const { labels } = this.state;
           return(
                <Modal isOpen={this.props.trigger} toggle={this.onToggle}
                    className={'modal-success ' + this.props.className}>
                <ModalHeader toggle={this.onToggle}>Verify annotation</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <h5>Content</h5>
                        <textarea className="form-control-plaintext border" rows="5" readOnly >{this.props.data.content}</textarea>
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
                        <EditAnnotationModal   trigger={this.state.edit}
                                               toggle={this.onEdit}
                                               data={this.props.data}>
                        </EditAnnotationModal>
                     </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.onToggle}>Cancel</Button>
                </ModalFooter>
               </Modal>

           )
       }
}

export default VerifyDocumentModal;