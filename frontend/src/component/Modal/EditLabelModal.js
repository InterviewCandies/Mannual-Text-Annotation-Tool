import React,{Component} from 'react'
import {
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
import { editLabel } from '../../functions/label.function';
import DeleteLabelModal from './DeleteLabelModal';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
class EditLabelModal extends Component{
    constructor(props){
        super(props);
        const {project_id,content,shortcut,backgroundColor,textColor} =this.props.label
        this.state = {
             project_id :project_id,
             content : content,
             shortcut : shortcut,
             delete : false,
             backgroundColor: backgroundColor,
             textColor : textColor
        }
        this.onToggle = this.props.toggle
    }
 
    componentDidUpdate(oldProps){
        const props = this.props
        const {project_id,content,shortcut,backgroundColor,textColor} =props.label
        if(oldProps.label!=props.label) {
           this.setState({
             project_id :project_id,
             content : content,
             shortcut : shortcut,
             backgroundColor: backgroundColor,
             textColor : textColor
           })
        }
    }

    onChangeContent=(e)=>{
        this.setState({
            content: e.target.value
        })
    }
    onChangeShortcut=(e)=>{
        this.setState({
           shortcut : e.target.value
        })
    }
    onChangeBackgroundColor=(e)=>{
        this.setState({
            backgroundColor : e.target.value
        })
    }
    
    onChangeTextColor=(e)=>{
        this.setState({
           textColor : e.target.value
        })
    }
    
    onSubmit = async (e)=>{
        e.preventDefault()
        const {project_id,content,shortcut,backgroundColor,textColor} =this.state
        if(content =='') {
             toast.error('Error: Label\'s content is required');
             return
        }
        const result =await editLabel(this.props.label.id,project_id,content,shortcut,backgroundColor,textColor)
        this.onToggle()
        this.props.action()
    }
    onDelete = async (e)=>{
        this.setState({
            delete : !this.state.delete
        })
    }
       render(){
           return(
            <div>
                <ToastContainer></ToastContainer>
                <Modal isOpen={this.props.trigger} toggle={this.onToggle}
                    className={'modal-primary ' + this.props.className}>
                <ModalHeader toggle={this.onToggle}>Edit label</ModalHeader>
                <ModalBody>
                <form onSubmit={this.onSubmit}>
               
                <div class="form-group row">
                    <label  for="content" class="col-sm-3 col-form-label"><strong>Content:</strong></label>
                    <div class="col-sm-8">
                        <input type="text" 
                                className="form-control" 
                                id="content" 
                                value={this.state.content}
                                onChange={this.onChangeContent}/>
                    </div>
                </div>
                <div class="form-group row">
                <label  for="shortcut" class="col-sm-3 col-form-label"><strong>Shortcut:</strong></label>
                    <div class="input-group col-sm-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="shortcut">@</span>
                        </div>
                            <input type="text" class="form-control" value={this.state.shortcut} onChange={this.onChangeShortcut}/>
                    </div>
                </div>
                <div class="form-group row">
                <label  for="color" class="col-sm-3 col-form-label" ><strong>Background:</strong></label>
                <div class="col-sm-8">
                        <input type="color" value={this.state.backgroundColor} className="form-control col-sm-8" onChange={this.onChangeBackgroundColor}></input>
                    </div>
                </div>
                <div class="form-group row">
                <label  for="color" class="col-sm-3 col-form-label"><strong>Text color:</strong></label>
                <div class="col-sm-8">
                        <input type="color"  value={this.state.textColor} className="form-control col-sm-8" onChange={this.onChangeTextColor}></input>
                    </div>
                </div>   
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onSubmit}>Save changes</Button>{' '}
                    <Button color="danger" onClick={this.onDelete}>Delete this label</Button>{' '}
                    <DeleteLabelModal trigger={this.state.delete}
                                                toggle={this.onDelete}
                                                close ={this.onToggle}
                                                data={this.props.label}
                                                action={this.props.action}>
                    </DeleteLabelModal>
                    <Button color="secondary" onClick={this.onToggle}>Cancel</Button>
                  </ModalFooter>
               </Modal>
            </div>
           )
       }
}

export default EditLabelModal