import React,{Component} from 'react'
import {
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
import { createLabel } from '../../functions/label.function';
const HEXA_CODE = new RegExp( '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$' )
class CreateLabelModal extends Component{
    constructor(props){
        super(props);
        this.state = {
             content : '',
             shortcut : '',
             color: ''
        }
        this.onToggle = this.props.toggle
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
    onChangeColor=(e)=>{
        this.setState({
            color : e.target.value
        })
        document.getElementById('color').style.background=HEXA_CODE.test(e.target.value)?e.target.value:'#FFFFFF'
    }
    onSubmit = async (e)=>{
        e.preventDefault()
        await createLabel(this.props.data.id,this.state.content,this.state.shortcut,this.state.color)
        this.setState({
            content:'',
            color:'',
            shortcut:''
        })
        this.onToggle()
        this.props.action()
    }
       render(){
           return(
                <Modal isOpen={this.props.trigger} toggle={this.onToggle}
                    className={'modal-info ' + this.props.className}>
                <ModalHeader toggle={this.onToggle}>Create new label</ModalHeader>
                <ModalBody>
                  <form>
                        <div class="form-group row">
                            <label  for="content" class="col-sm-2 col-form-label">Content:</label>
                            <div class="col-sm-10">
                                <input type="text" 
                                        className="form-control" 
                                        id="content" 
                                        value={this.state.content}
                                        onChange={this.onChangeContent}/>
                            </div>
                        </div>
                        <div class="form-group row">
                           <label  for="shortcut" class="col-sm-2 col-form-label">Shortcut:</label>
                            <div class="input-group col-sm-10">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="shortcut">@</span>
                                </div>
                                    <input type="text" class="form-control" value={this.state.shortcut} onChange={this.onChangeShortcut}/>
                             </div>
                        </div>
                        <div class="form-group row">
                           <label  for="color" class="col-sm-2 col-form-label">Color:</label>
                           <div class="col-sm-6">
                                <input type="text" 
                                        className="form-control" 
                                        placeholder="Only hexa color code"
                                        onChange={this.onChangeColor}
                                        value={this.state.color}
                                        />
                            </div>
                            <div class="col-sm-4">
                                <input type="text" 
                                        className="form-control" 
                                        id="color" 
                                        />
                            </div>
                           
                        </div>
                        
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={this.onSubmit}>Create</Button>{' '}
                    <Button color="secondary" onClick={this.onToggle}>Cancel</Button>
                  </ModalFooter>
               </Modal>

           )
       }
}

export default CreateLabelModal