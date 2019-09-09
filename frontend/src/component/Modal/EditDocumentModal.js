import React,{Component} from 'react'
import {
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
import { editDocument } from '../../functions/dataset.function';
class EditDocumentModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.data.id,
            content: this.props.data.content
        }
        this.onToggle = this.props.toggle
    }
    componentDidUpdate(oldProps){
        const props = this.props
         if(oldProps.data != props.data) {
              this.setState({
                 id: props.data.id,
                 content : props.data.content
              })
         }
    }

    onChangeContent=(e)=>{
        this.setState({
            content : e.target.value
        })
    
    }
  
    onSubmit = async (e)=>{
        e.preventDefault()
        const result=await editDocument(this.state.id,this.state.content)

        if(result) alert('Document has been updated')
        else  alert('Failed to edit this document')

        this.onToggle()
        this.props.action()   
    }
       render(){
           return(
                <Modal isOpen={this.props.trigger} toggle={this.onToggle}
                    className={'modal-info ' + this.props.className}>
                <ModalHeader toggle={this.onToggle}>Edit document</ModalHeader>
                <ModalBody>
                  <form>
                        <div class="form-group row">
                            <label  for="projectname" class="col-sm-2 col-form-label">Content:</label>
                            <div class="col-sm-10">
                                <textarea className="form-control" value={this.state.content}
                                            onChange={this.onChangeContent}>
                                </textarea>
                            </div>
                        </div>
                       
                       
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={this.onSubmit}>Update</Button>{' '}
                    <Button color="secondary" onClick={this.onToggle}>Cancel</Button>
                  </ModalFooter>
               </Modal>

           )
       }
}

export default EditDocumentModal