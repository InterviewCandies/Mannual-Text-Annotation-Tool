import React,{Component} from 'react'
import {
   Button,
   ButtonGroup,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
import { listLabel } from '../../functions/label.function';
import { annotate } from '../../functions/dataset.function';
class LabelCard  extends Component{
    constructor(props){
      super(props)
    }
    onClick=(e)=>{
         e.preventDefault();
        this.props.action(e,this.props.label)
    }
    render(){
      const {textColor,backgroundColor,shortcut,content} = this.props.label
      return(
        <ButtonGroup className="mr-sm-2 mb-sm-2">
          <Button  style={{background:backgroundColor, color:textColor}}>
              <i className="fa fa-times-circle" onClick={this.onClick} > {content}</i>
          </Button>
          <Button  disabled>{shortcut}</Button>
       </ButtonGroup>
      )
    }
    
  }
  
  
class EditAnnotationModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            id : this.props.data.id,  
            projectLabels : [],
            labels : this.props.data.labels
        }
        this.projectId = localStorage.getItem('projectId')
        this.onToggle = this.props.toggle
    }
    async componentDidMount(){
        this.setState({
            projectLabels : await listLabel(this.projectId) ,
      })
     
    }
    componentDidUpdate(oldProps){
        const props = this.props
        if(oldProps.data!=props.data) {
           this.setState({
            id : props.data.id,
            labels : props.data.labels
           })
        }
    }
    onRemoveLabel =(e,label) =>{
        let {labels} = this.state
        let i= labels.indexOf(label)
        if(i!=-1) labels.splice(i,1);
        this.setState({
           labels: labels
        })
   
     }

     onLabelClick =(e,label)=>{
        let {labels} = this.state
        const i = labels.find((l)=>l.content==label.content)
        if(!i)  labels.push(label)
   
        this.setState({
             labels: labels
        })
     }
   
    onSubmit = async (e)=>{
        const {id,labels} = this.state
        const result=await annotate(id,labels)
        this.onToggle()
        this.props.action()
    }
       render(){
           let {projectLabels,labels} = this.state
           projectLabels = projectLabels || []
           labels = labels || []
           return(
                <Modal isOpen={this.props.trigger} toggle={this.onToggle}
                    className={'modal-success ' + this.props.className}>
                <ModalHeader toggle={this.onToggle}>Edit Annotation</ModalHeader>
                <ModalBody>
                     <h5>Labels of this project:</h5>
                     <p className="font-italic">(Click to add new label to this document)</p>
                     <div className="border bg-light p-sm-2 mb-sm-2" >
                         {projectLabels.map(label=><LabelCard label={label} action={this.onLabelClick}></LabelCard>)}
                     </div>
                     <h5>Labels of this document:</h5>
                     <p className="font-italic">(Click to remove label from this document)</p>
                     <div className="border bg-light p-sm-2">
                         {labels.map(label=><LabelCard label={label} action={this.onRemoveLabel}></LabelCard>)}
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

export default EditAnnotationModal